import { useState, useEffect } from 'react'
import {
  Routes, Route,
  useNavigate, useMatch
} from 'react-router-dom'

// components
import Header from './components/Header'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogAdder from './components/BlogAdder'
import Blog from './components/Blog'
import HoverNotification from './components/HoverNotification'

// services
import blogService from './services/blogs'
import loginService from './services/login'
import localStore from './services/localStorage'

/* App */
const App = () => {
  const navigate = useNavigate()

  const [notificationGood, setNotificationGood] = useState(null)
  const [notificationBad, setNotificationBad] = useState(null)

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  // get blogs
  useEffect(() => {
    blogService.getAll().then(res => {
      const sortedBlogs = [...res.data].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  // logged in user
  useEffect(() => {
    const user = localStore.getJson('loggedInUser')
    if (user) {
      setUser(user)
      blogService.setAuthToken(user.token)
    }
  }, [])

  // handle: login
  const handleLogin = async (username, password, onSuccess) => {
    const res = await loginService.authenticateUser(username, password)
    if (res.good) {
      setUser(res.data)
      blogService.setAuthToken(res.data.token)
      localStore.setJson('loggedInUser', res.data)
      setNotificationGood(`welcome ${username}`)
      navigate('/')
      onSuccess()
    } else {
      setNotificationBad('unable to authenticate user')
    }
  }

  // handle: logout
  const handleLogout = () => {
    setUser(null)
    localStore.remove('loggedInUser')
    blogService.setAuthToken(null)
    setNotificationGood(`goodbye ${user.username}`)
  }

  // handle: blog create
  const handleBlogCreate = async (title, author, url, onSuccess) => {
    const res = await blogService.create(title, author, url)
    if (res.good) {
      const newBlogs = [...blogs, res.data]
      setBlogs(newBlogs)
      setNotificationGood('created new blog', 2000)
      navigate('/')
      onSuccess()
    } else {
      setNotificationBad(`blog creation failed: ${JSON.stringify(res.data)}`, 4000)
    }
  }

  // handle: like blog
  const handleBlogLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const dataToSend = { ...blog }
    dataToSend.user = blog.user.id
    dataToSend.likes += 1
    const res = await blogService.update(dataToSend)
    if (res.good) {
      setNotificationGood(`updated likes count to: ${dataToSend.likes}`)
      res.data.user = blog.user
      setBlogs(
        blogs.filter(b => {
          if (b.id === blog.id) {
            b.likes += 1
          }
          return b
        })
      )
    } else {
      setNotificationBad(`unable to update likes: status=${res.status}: ${JSON.stringify(res.data)}`)
    }
  }

  // handle: blog delete
  const handleBlogDelete = async (id, title) => {
    if (window.confirm(`delete blog with title: "${title}"`)) {
      console.log('deleting blog with id:', id)
      const res = await blogService.remove(id)
      if (res.good) {
        setNotificationGood(`deleted blog with id: ${id}`)
        setBlogs(blogs.filter(blog => blog.id !== id))
        navigate('/')
      } else {
        console.log(res.status, res.data)
        setNotificationBad(`failed to delete blog: status=${res.status}: ${JSON.stringify(res.data)}`)
      }
    }
  }

  /* JSX */
  return (
    <>
      {/* nav bar */}
      <Header user={user} handleLogout={handleLogout} />
      <HoverNotification messageGood={notificationGood} messageBad={notificationBad} />
      <Routes>
        <Route path="/" element={
          <BlogList
            blogs={blogs}
          />
        } />
        <Route path="/blogs/:id" element={
          <Blog
            blog={blog}
            currentUser={user}
            handleBlogLike={handleBlogLike}
            handleBlogDelete={handleBlogDelete}
          />
        } />
        <Route path="/create" element={
          <BlogAdder handleSubmit={handleBlogCreate} />
        } />
        <Route path="/login" element={
          <LoginForm
            handleLogin={handleLogin}
          />
        } />
        <Route path="*" element={
          <h2>Route not found</h2>
        } />
      </Routes>
    </>
  )
}

export default App

