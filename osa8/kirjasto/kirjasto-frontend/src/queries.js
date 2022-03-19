import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published 
    author {
      name 
      born
      bookCount
    }
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }    
    }
`

export const GET_BOOKS = gql`
  query allBooks($genre: String, $author: String){
    allBooks(genre: $genre, author: $author){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const GET_CURRENT_USER = gql`
  query me {
    me {
        favoriteGenre
      }
  }
`

export const BOOK_ADDED = gql`
  subscription { 
    bookAdded {
    ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

