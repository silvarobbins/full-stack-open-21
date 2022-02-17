import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
    component.debug()

  })

  test('url and likes are shown when blog is expanded', async () => {
    const button = component.getByText(blog.title)
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    component.debug()

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(likeButton).toBeDefined()
  })

  test('pressin like button twice calls like function twice', async () => {
    const button = component.getByText(blog.title)
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })

})