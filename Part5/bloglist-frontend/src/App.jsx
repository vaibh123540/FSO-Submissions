import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createNewBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
          setSuccessMessage(null)
      }, 5000)
    } catch(error) {
      console.log(error)
    }
  }

  const likeBlog = async (blog, id) => {
    try {
      blog.likes++
      const updatedBlog = await blogService.update(blog, id)
      setBlogs(blogs.map(b => b.id === id ? updatedBlog : b))
    } catch(error) {
      console.log(error)
    }
  }
  
  const removeBlog = async (blog) => {
    try {
      if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      {
        user === null ?
        (
          <Login
          setPassword={setPassword}
          setUsername={setUsername}
          password={password}
          username={username}
          handleLogin={handleLogin}
          errorMessage={errorMessage} />
        )
        :
        (
          <Blogs
          blogs={blogs}
          user={user}
          successMessage={successMessage}
          handleLogout={handleLogout}
          createNewBlog={createNewBlog}
          blogFormRef={blogFormRef}
          likeBlog={likeBlog}
          removeBlog={removeBlog} />
        )
      }
      
    </div>
  )
}

export default App