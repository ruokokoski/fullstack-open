import userService from '../services/users'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper } from '@mui/material'

const UserItem = ({ user }) => {
  return (
    <>
    <TableCell>
      <Link to={`/users/${user.id}`} style={{ width: '20%' }}>
        {user.name}
      </Link>
    </TableCell>
    <TableCell>{user.blogs.length}</TableCell>
    </>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>blogs created</b></TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow key={user.id}>
                <UserItem key={user.id} user={user} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
/*
<ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <div style={{ width: '20%' }}></div>
          <div style={{ width: '80%' }}>blogs created</div>
        </li>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
        */