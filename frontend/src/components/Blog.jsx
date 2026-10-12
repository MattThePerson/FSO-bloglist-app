import {
  BlogContainer, Title, A, LightText, DarkText,
  InteractionsRow, DeleteButton, LikeButton,
} from './Blog.styles.js'

const Blog = ({ blog, currentUser, handleBlogLike, handleBlogDelete }) => {

  if (!blog) {
    return null
  }

  if (!blog.user) {
    return <div>Blog missing user: {JSON.stringify(blog)}</div>
  }

  const uploadedByCurrentUser = blog.user && currentUser && currentUser.username === blog.user.username
  const userAuthorized = currentUser && currentUser.username

  const deleteButton = (
    <DeleteButton
      onClick={() => handleBlogDelete(blog.id, blog.title)}
    >delete</DeleteButton>
  )

  const likeButton = (
    <LikeButton
      onClick={() => handleBlogLike(blog.id)}
    >like</LikeButton>
  )

  return (
    <BlogContainer>
      <Title>{blog.title}</Title>
      <LightText>By {blog.author}</LightText>
      <A href={blog.url} target="_blank">{blog.url}</A>
      <InteractionsRow>
        <DarkText aria-label="Likes">{blog.likes} likes</DarkText>
        {userAuthorized && likeButton}
        {uploadedByCurrentUser && deleteButton}
      </InteractionsRow>
      <LightText>Added by {blog.user.username}</LightText>
    </BlogContainer>
  )
}

export default Blog
