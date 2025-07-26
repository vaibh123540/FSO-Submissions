import { useState} from 'react'

const BlogForm = ({createNewBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (e) => {
        e.preventDefault()
        createNewBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>Create New</h2>
            <div>title <input id={"title-input"} value={title} onChange={({target}) => {setTitle(target.value)}}/></div>
            <div>author <input id={"author-input"} value={author} onChange={({target}) => {setAuthor(target.value)}}/></div>
            <div>url <input id={"url-input"} value={url} onChange={({target}) => {setUrl(target.value)}}/></div>
            <button type='Submit'>create</button>
        </form>
    )
}

export default BlogForm