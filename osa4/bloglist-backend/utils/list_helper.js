const { indexOf } = require('lodash');
var lodash = require('lodash');

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const likesList = blogs.map(blog => blog.likes)
    const reducer = (sum, likes) => {
        return sum + likes
      }
    
      return likesList.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0]
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > fav.likes) {
            fav = blogs[i]
        }
    }

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const authorsSums = lodash.countBy(authors)

    const max = Object.keys(authorsSums).reduce(function(a, b){ return authorsSums[a] > authorsSums[b] ? a : b })
    return {
        author: max,
        blogs: authorsSums[max]
    }
}

const mostLikes = (blogs) => {
    const info = lodash.map(blogs, function(b) {return lodash.pick(b,['author', 'likes'])})
    const info2 = lodash.groupBy(info, 'author')
    const names = lodash.keys(info2)
    const likes = lodash.map(Object.values(info2), function(a) {return lodash.sumBy(a, 'likes')})
    const max = lodash.max(likes)
    const likedauthor = names[indexOf(likes, max)]
    
    return {
        author: likedauthor,
        likes: max
    }
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
