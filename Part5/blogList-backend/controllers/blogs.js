const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const blogBody = request.body

  if (!blogBody.title) {
    response.status(400).json({error: "Title missing"})
  }

  if (!blogBody.url) {
    response.status(400).json({error: "Url missing"})
  }

  try {
    const user = request.user

    const blog = new Blog({
      title: blogBody.title,
      author: blogBody.author,
      url: blogBody.url,
      likes: blogBody.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndDelete(request.params.id)

      user.blogs = user.blogs.filter(b => b.id !== blog._id.toString())
      await user.save()

      response.status(204).end()
    } else {
      response.status(401).json({ error: "Unauthorized user" })
    }
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogBody = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  blog.likes = blogBody.likes

  try {
    const updatedBlog = await blog.save()
    const responseBlog = await Blog.findById(updatedBlog.id).populate('user', {username: 1, id: 1, name: 1})
    response.json(responseBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter