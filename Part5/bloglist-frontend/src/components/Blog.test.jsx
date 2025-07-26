import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 0,
    user: {
        id: '123',
        username: 'testuser',
        name: 'Test User'
    }
}
const user = {
    username: 'testuser'
}   

test('renders title and author', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.defaultView')
    const detailedDiv = container.querySelector('.detailedView')

    expect(div).toHaveTextContent('Test Blog Test Author')
    expect(detailedDiv).toHaveStyle('display: none')
})

test('renders url and likes when view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const myUser = userEvent.setup()

    const viewButton = screen.getByText('view')

    await myUser.click(viewButton)

    const detailedDiv = container.querySelector('.detailedView')
    const div = container.querySelector('.defaultView')
    expect(div).toHaveStyle('display: none')
    expect(detailedDiv).toHaveStyle('display: block')
    expect(detailedDiv).toHaveTextContent('http://test.com')
    expect(detailedDiv).toHaveTextContent('likes 0')
})

test('clicking like button twice calls event handler twice', async () => {
    const likeBlog = vi.fn()

    const { container } = render(<Blog blog={blog} user={user} likeBlog={likeBlog} />)

    const myUser = userEvent.setup()

    const viewButton = screen.getByText('view')
    await myUser.click(viewButton)

    const likeButton = screen.getByText('like')

    await myUser.click(likeButton)
    await myUser.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
})

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createNewBlog = vi.fn()
    const myUser = userEvent.setup()
    const { container } = render(<BlogForm createNewBlog={createNewBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = screen.getByText('create')

    await myUser.type(titleInput, 'New Blog Title')
    await myUser.type(authorInput, 'New Blog Author')
    await myUser.type(urlInput, 'http://newblog.com')
    await myUser.click(sendButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toEqual({
        title: 'New Blog Title',
        author: 'New Blog Author',
        url: 'http://newblog.com'
    })
})