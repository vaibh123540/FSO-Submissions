import { useState } from "react"

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={() => likeBlog({
          author : blog.author,
          title: blog.title,
          url: blog.url,
          likes: blog.likes,
          user: blog.user.id}, blog.id)}>like</button>
        <br />
        {blog.user.username}
        <div style={ {display: blog.user.username === user.username ? '' : 'none'} }>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      </div>
    </div>  
  )
}

export default Blog