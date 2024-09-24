import { useReducer } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        message: `You created: ${action.content}`
      }
    case "VOTE":
      return {
        ...state,
        message: `You voted: ${action.content}`
      }
    case "CLEAR":
      return {
        ...state,
        message: null
      }
    case "FAIL":
      return {
        ...state,
        message: action.content
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notifReducer, { message: '' })

  useEffect(() => {
    console.log('State changed:', state)
  }, [state])

  const showNotification = (type, content) => {
    console.log('Content:', content, 'Type:', type)
    dispatch({ type, content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ message: state.message, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
