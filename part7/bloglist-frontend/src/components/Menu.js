import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = ({ name, handleLogout }) => {
  /*
  const padding = {
    paddingRight: 5
  } */
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" component={Link} onClick={handleLogout} >
          logout
        </Button>
        &nbsp;&nbsp;&nbsp;{name} logged in
      </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu
// <button onClick={handleLogout}>logout</button>