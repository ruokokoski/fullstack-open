import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const SingleBlog = ({blogs, setBlogs}) => {
  const { blogid } = useParams()
  const [blog, setBlog] = useState(null)
  const [likes, setLikes] = useState(0)

  console.log('BlogId:', blogid)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log('Blogs:', blogs)
      const foundBlog = blogs.find((blog) => blog.id === blogid)
      setBlog(foundBlog)
      setLikes(foundBlog.likes)
    })
  }, [blogid])

  if (!blog) {
    return <div>Waiting...</div>
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const updated = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(updated)
    setBlogs(blogs.map((b) => (b.id === returnedBlog.id ? returnedBlog : b)))
    setBlog({ ...returnedBlog, user: blog.user })
    setLikes(returnedBlog.likes)
  }
  /*
  const handleLikes = async (event) => {
    event.preventDefault()
    const updated = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updated)
    setBlogs(blogs.map((b) => (b.id === updated.id ? updated : b)))
    setLikes(updated.likes)
  } */

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{likes} likes <button
				onClick={handleLikes}
				style={{ backgroundColor: 'lightgreen' }}
			>like</button></p>
      
      <p>added by {blog.user.name}</p>
    </div>
  )

}

export default SingleBlog