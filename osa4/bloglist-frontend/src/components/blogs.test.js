import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url.com',
    likes: 3
  }

  const user = {
    name: 'John Doe',
    username: 'mockusername'
  }

  const mockLike = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} loggedUser={user} likeBlog={mockLike} deleteBlog={mockDelete}/>
    )
  })

  test('by default, renders title and author but not url or likes', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveStyle('display:none')
    component.debug()

  })

  test

})