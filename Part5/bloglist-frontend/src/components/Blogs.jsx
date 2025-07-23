import Blog from './Blog'
import Success from './Success'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const compareLikes = (a, b) => {
    if (a.likes < b.likes) return 1
    else if (a.likes > b.likes) return -1
    return 0
}

const Blogs = (props) => {
    return(
        <div>
        <h2>blogs</h2>
        {props.successMessage !== null && (<Success successMessage={props.successMessage}/>)}
        <div>
            {props.user.name} logged in <button onClick={() => props.handleLogout()}>logout</button>
        </div>
        <br />
        <div>
            <Togglable buttonLabel='new blog' ref={props.blogFormRef}>
                <BlogForm createNewBlog={props.createNewBlog}/>
            </Togglable>
        </div>
        <div>
            {props.blogs.sort(compareLikes).map(blog =>
                <Blog key={blog.id}
                blog={blog}
                likeBlog={props.likeBlog}
                user={props.user}
                removeBlog={props.removeBlog}/>
            )}
        </div>
        </div>
    )
}

export default Blogs