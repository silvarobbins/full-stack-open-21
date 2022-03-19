const { ApolloServer,
  UserInputError,
  AuthenticationError,
  gql } = require('apollo-server');
const mongoose = require('mongoose')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })

        return await Book.find({
          $and: [
            { genres: args.genre },
            { author: { $in: author.id} }
          ]})
      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: author.id } }).populate('author')
      } else if (args.genre && !args.author) {
        return await Book.find({ genres: args.genre }).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map((a) => {
        return {
          name: a.name,
          born: a.born,
          bookCount: a.bookCount,
          id: a._id
        }
      })
    },
    me: (roots, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const bookId = mongoose.Types.ObjectId();
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })
      } else {
          author.bookCount += 1
        }
      try {
        await author.save()
        const book = new Book({ ...args, author: author._id, id: bookId })
        console.log({book})
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
      } 
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
    return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
  }

module.exports = resolvers