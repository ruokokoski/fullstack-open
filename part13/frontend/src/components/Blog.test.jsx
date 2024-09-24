import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title by default', () => {
  const blog = {
    title: 'Test title',
    author: 'Teemu Testaaja',
    url: 'www.test.fi',
    likes: 10,
    user: {
      name: 'Joku Vaa'
    }
  }
  render(<Blog blog={blog} />)

  const element = screen.getByText('Test title', { exact: false })
  const element2 = screen.queryByText('www.test.fi')

  expect(element).toBeDefined()
  expect(element2).toBeNull()
})