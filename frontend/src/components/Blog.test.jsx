import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const currentUser = { username: 'root' }
const altUser = { username: 'sam' }

const blog = {
  title: 'Test blog',
  author: 'Mr Tester',
  url: 'https://some-website.com/test',
  likes: 1,
  user: currentUser,
}

describe('single blog', () => {

  test('blog information visible', async () => {
    render(
      <Blog
        blog={blog}
        currentUser={null}
      />
    )
    let visibleText = [blog.title, blog.author, blog.url, blog.likes, blog.user.username]
    for (let txt of visibleText) {
      expect(await screen.findByText(txt, { exact: false })).toBeVisible()
    }
  })

  test('unauthenticated user: button visibility', () => {
    render(
      <Blog
        blog={blog}
        currentUser={{}} // unauthenticated
      />
    )
    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
  })

  test('authenticated user: button visibility', () => {
    render(
      <Blog
        blog={blog}
        currentUser={altUser} // authenticated (non creator)
      />
    )
    expect(screen.queryByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument()
  })

  test('creator: button visibility', () => {
    render(
      <Blog
        blog={blog}
        currentUser={currentUser} // creator
      />
    )
    expect(screen.queryByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'delete' })).toBeInTheDocument()
  })


  test('authenticated user: like button: handler called twice', async () => {

    const mockHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        handleBlogLike={mockHandler}
        currentUser={currentUser}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'like' })
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

