import { useState } from 'react'
import { Link } from 'react-router-dom' // Tehtävä 7.16
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper } from '@mui/material'

const Blog = ({ blog, handleLikes, handleRemove, user }) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

  /* Poistettu tehtävässä 7.20:
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	} */

	return (
		<div>
			<TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: '50%' }}>
                <Link to={`/blogs/${blog.id}`}>
					        {blog.title} {blog.author}
				        </Link>{' '}
              </TableCell>
            <TableCell>
				      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
            </TableCell>
          </TableRow> 
			  {visible && (
				<TableRow>
          <TableCell colSpan={2}>
					<div>{blog.url}</div>
					<div>
						likes {blog.likes}{' '}
						<button
							onClick={() => handleLikes(blog)}
							style={{ backgroundColor: 'lightgreen' }}
						>
							like
						</button>
					</div>
					<div>
						{blog.user && <div>{blog.user.name}</div>}
						{!blog.user && user && <div>{user.name}</div>}
						{user.name === blog.user.name && (
							<button
								style={{ backgroundColor: '#c8a2c8' }}
								onClick={() => handleRemove(blog)}
							>
								remove
							</button>
						)}
					</div>
          </TableCell>
				</TableRow>
			)}
      </TableBody>
      </Table>
      </TableContainer>
    </div>
	)
}

export default Blog
// <div className="blog" style={blogStyle}>