import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

  return (
    <div>
      <h2>Blogs</h2>
      <ul className='blogs-list'>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList

