import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Users from './components/Users'
import User from './components/User'
import Notif from './components/Notif'
import Togglable from './components/Togglable'
import Menu from './components/Menu' // Tehtävä 7.17
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { createNotification } from './reducers/notifReducer' // Tehtävä 7.10

import { Container } from '@mui/material' // Tehtävä 7.20

const App = () => {
  const dispatch = useDispatch() // Tehtävä 7.10
  const notification = useSelector(state => state.notification)
	const [blogs, setBlogs] = useState([])
	//const [info, setInfo] = useState({ message: null })
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs => {
			// Tehtävä 5.10
			const sorted = blogs.sort((a, b) => b.likes - a.likes)
			setBlogs(sorted)
		})
	}, [])

	// Tehtävä 5.2
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const notify = (message, type = 'info', timeout = 5000) => {
    dispatch(createNotification({ message, type}))
    setTimeout(() => {
      dispatch(createNotification({ message: '', type }))
    }, timeout)
    /*
		setInfo({ message, type })
		setTimeout(() => {
			setInfo({ message: null })
		}, 5000) */
	}

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)) // Tehtävä 5.2
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			notify('wrong username or password', 'error')
			setUsername('')
			setPassword('')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogUser')
		setUser(null)
	}

	const handleLikes = async blog => {
		const updatedB = { ...blog, likes: blog.likes + 1 }
		await blogService.update(updatedB)
		setBlogs(blogs.map(bl => (bl.id === updatedB.id ? updatedB : bl)))
	}

	// Tehtävä 5.11
	const handleRemove = async blog => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			await blogService.remove(blog.id)
			setBlogs(blogs.filter(b => b.id !== blog.id))
			notify(`${blog.title} by ${blog.author} has been removed`)
		}
	}

	const addBlog = blogObject => {
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				returnedBlog.user = user // Tehtävä 5.8
				setBlogs(blogs.concat(returnedBlog))
				notify(
					`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
				)
			})
			.catch(error => {
				console.error('Error creating blog:', error)
				notify('Error creating blog', 'error')
			})
	}

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notif notification={notification} />
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
				/>
			</div>
		)
	}
	return (
    <Container>
    <BrowserRouter>
		<div>
      <Menu name={user.name} handleLogout={handleLogout} />
			<h2>Blogs</h2>
			<Notif notification={notification} />
			<b></b>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={
          <>
			    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
				    <CreateForm createBlog={addBlog} />
			    </Togglable>
			    {blogs.map(blog => (
				    <Blog
					    key={blog.id}
					    blog={blog}
					    handleLikes={handleLikes}
					    handleRemove={handleRemove}
					    user={user}
				    />
			    ))}
          </>
        } />
        <Route path="/users/:id" element={
          <div>
            <User />
          </div>
        } />
        <Route path="/blogs/:blogid" element={
          <div>
            <SingleBlog blogs={blogs} setBlogs={setBlogs} />
          </div>
        } />
      </Routes>
		</div>
    </BrowserRouter>
    </Container>
	)
}

export default App
/*
<p>
	{user.name} logged in<button onClick={handleLogout}>logout</button>
</p> */
