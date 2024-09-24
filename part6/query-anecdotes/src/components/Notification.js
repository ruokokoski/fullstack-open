import { useContext } from 'react'
import NotificationContext from '../NotifContext'

const Notification = () => {
  const { message } = useContext(NotificationContext) // Tehtävä 6.23
  console.log('Notification context value:', message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  //if (!message) return null
  //if (true) return null

  return (
    <div style={style}>
      {message || <div></div>}
    </div>
  )
}

export default Notification
