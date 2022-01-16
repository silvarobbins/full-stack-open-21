/* eslint-disable quotes */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  let component

  const mockCreate = jest.fn()

  beforeEach(() => {
    component = render(
      <NewBlogForm createBlog={mockCreate}/>
    )
  })

  test('new blog form sends new blog on submit', () => {
    const title = component.container.querySelector("input[name='Title']")
    const author = component.container.querySelector("input[name='Author']")
    const url = component.container.querySelector("input[name='Url']")
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'some blog' }
    })
    fireEvent.change(author, {
      target: { value: 'some author' }
    })
    fireEvent.change(url, {
      target: { value: 'some url' }
    })
    fireEvent.submit(form)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0].title).toBe('some blog')
    expect(mockCreate.mock.calls[0][0].author).toBe('some author')
    expect(mockCreate.mock.calls[0][0].url).toBe('some url')
    expect(mockCreate.mock.calls[0][0].likes).toBe(0)
  })
})