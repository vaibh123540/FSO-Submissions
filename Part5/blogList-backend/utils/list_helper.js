const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum+blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    return blogs.reduce((mostLiked, blog) => {
        if (blog.likes > mostLiked.likes) {
            return blog
        }
        return mostLiked
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let temp = []

    blogs.forEach(blog => {
        const authorBlogs = temp.find(a => a.author === blog.author)
        if (authorBlogs) {
            authorBlogs.blogs++
        }
        else {
            temp = temp.concat({
                author: blog.author,
                blogs: 1
            })
        }
    })

    return temp.reduce((most, current) => {
        if (current.blogs > most.blogs) {
            return current
        }
        return most
    }, temp[0])
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let temp = []

    blogs.forEach(blog => {
        const authorBlogs = temp.find(a => a.author === blog.author)
        if (authorBlogs) {
            authorBlogs.likes += blog.likes
        }
        else {
            temp = temp.concat({
                author: blog.author,
                likes: blog.likes
            })
        }
    })

    return temp.reduce((most, current) => {
        if (current.likes > most.likes) {
            return current
        }
        return most
    }, temp[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}