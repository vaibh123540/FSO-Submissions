import Blog from './Blog'
import Success from './Success'

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
            <form onSubmit={props.createNewBlog}>
            <h2>Create New</h2>
            <div>title <input value={props.title} onChange={({target}) => {props.setTitle(target.value)}}/></div>
            <div>author <input value={props.author} onChange={({target}) => {props.setAuthor(target.value)}}/></div>
            <div>url <input value={props.url} onChange={({target}) => {props.setUrl(target.value)}}/></div>
            <button type='Submit'>create</button>
            </form>
        </div>
        <div>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
        </div>
    )
}

export default Blogs