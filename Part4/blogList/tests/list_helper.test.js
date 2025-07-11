const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}  
]

const listWithOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
    }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    test('of empty list is 0', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 36)
    })
})

describe('fav blog', () => {

    test('out of 0 blogs', () => {
        assert.deepEqual(listHelper.favoriteBlog([]), null)
    })

    test('out of 1 blog', () => {
        assert.deepEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
    })

    test('out of many blogs', () => {
        assert.deepEqual(listHelper.favoriteBlog(blogs), blogs[2])
    })
})

describe('most popular author', () => {

    test('of 0 blogs', () => {
        assert.deepEqual(listHelper.mostBlogs([]), null)
    })

    test('of 1 blog', () => {
        assert.deepEqual(listHelper.mostBlogs(listWithOneBlog), { author: 'Edsger W. Dijkstra', blogs: 1})
    })

    test('of many blogs', () => {
        assert.deepEqual(listHelper.mostBlogs(blogs), { author: "Robert C. Martin", blogs: 3})
    })
})

describe('most liked author', () => {

    test('of 0 blogs', () => {
        assert.deepEqual(listHelper.mostLikes([]), null)
    })

    test('of 1 blog', () => {
        assert.deepEqual(listHelper.mostLikes(listWithOneBlog), { author: 'Edsger W. Dijkstra', likes: 5})
    })

    test('of many blogs', () => {
        assert.deepEqual(listHelper.mostLikes(blogs), { author: "Edsger W. Dijkstra", likes: 17})
    })
})