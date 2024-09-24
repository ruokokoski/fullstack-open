import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const CreateForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleTitle = event => {
		setNewTitle(event.target.value)
	}

	const handleAuthor = event => {
		setNewAuthor(event.target.value)
	}

	const handleUrl = event => {
		setNewUrl(event.target.value)
	}

	const addBlog = event => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		})
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}
	return (
		<form onSubmit={addBlog} data-testid="create-form">
			<h2>Create new</h2>
			<div>
      <TextField
        label="Title"
        value={newTitle}
        onChange={handleTitle}
        id="title-input"
      />
			</div>
			<div>
      <TextField
        label="Author"
        value={newAuthor}
        onChange={handleAuthor}
        id="author-input"
      />
			</div>
			<div>
      <TextField
        label="URL"
        value={newUrl}
        onChange={handleUrl}
        id="url-input"
      />
			</div>
			<div>
        <Button variant="contained" color="primary" type="submit" id="create-button">
				  create
        </Button>
			</div>
		</form>
	)
}

export default CreateForm
