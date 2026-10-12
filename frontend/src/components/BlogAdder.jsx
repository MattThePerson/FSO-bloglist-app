import { useState } from 'react'
import { Input, Button } from '../styledComponents'

const BlogAdder = ({ handleSubmit }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(title, author, url, () => {
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create new blog</h2>
      <div>
        <label>
          <Input className="title-input" aria-label="Title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          ></Input>
        </label>
      </div>
      <div>
        <label>
          <Input className="author-input" aria-label="Author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></Input>
        </label>
      </div>
      <div>
        <label>
          <Input className="url-input" aria-label="URL"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          ></Input>
        </label>
      </div>
      <Button>create</Button>
    </form>
  )
}

export default BlogAdder
