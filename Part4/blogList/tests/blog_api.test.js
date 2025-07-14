const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    const savedUser = await user.save()

    const loginRes = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    token = `Bearer ${loginRes.body.token}`

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initial_blogs(savedUser.id.toString()))
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()

    for (let blog of blogs) {
        assert(blog.id)
    }
})

test('making an HTTP POST request successfully creates a new blog post', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blog = {
        title: "Test",
        author: "test",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .set({ Authorization: token })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    assert.strictEqual(finalBlogs.length, initialBlogs.length + 1)

    const blogs = finalBlogs.map(b => {
        return {
            title: b.title,
            author: b.author,
            url: b.url,
            likes: b.likes
        }
    })
    assert.deepEqual(blogs.at(-1), blog)
})

test('like defaults to 0', async () => {
    const blog = {
        title: "Test",
        author: "test",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .set({ Authorization: token })
    
    const finalBlogs = await helper.blogsInDb()
    assert.strictEqual(finalBlogs.at(-1).likes, 0)
})

test('title must exist', async () => {
    const blogNoTitle = {
        author: "test",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(blogNoTitle)
        .set({ Authorization: token })
        .expect(400)
        .expect({error: "Title missing"})
})

test('url must exist', async () => {
    const blogNoUrl = {
        title: "Test",
        author: "test",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(blogNoUrl)
        .set({ Authorization: token })
        .expect(400)
        .expect({error: "Url missing"})
})

test('Deletion of blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: token })
        .expect(204)    

    const blogs = await helper.blogsInDb()
    const ids = blogs.map(blog => blog.id)

    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogs.length, blogsAtStart.length - 1)
})

test('Update likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 100000

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
    
    const blogsAtEnd = await helper.blogsInDb()
    updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.deepEqual(updatedBlog, blogToUpdate)
})

test('Adding a blog fails if a token is not provided', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blog = {
        title: "Test",
        author: "test",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }

    const result = await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    assert.strictEqual(finalBlogs.length, initialBlogs.length)
})

after(async () => {
    mongoose.connection.close()
})