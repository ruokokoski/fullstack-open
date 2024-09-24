import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper } from '@mui/material'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  console.log('id:', id)
  
  useEffect(() => {
    userService.getAll().then((users) => {
      const currentUser = users.find((user) => user.id === id)
      if (currentUser) {
        setUser(currentUser)
      }
    })
  }, [id])

  if (!user) {
    return null
  }

  console.log('User:', user.blogs, 'id:', id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
              <TableCell key={blog.id}>
                {blog.title}
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>  
      </TableContainer>
    </div>
  )
}

export default User