import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
	handleLogin,
	username,
	setUsername,
	password,
	setPassword,
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
        <TextField label="username" value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}/>
				
			</div>
			<div>
        <TextField label="password" type='password' 
          value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}/>
				
			</div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
		</form>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}

export default LoginForm
/* vanha:
<button id="login-button" type="submit">
	login
</button>
*/
