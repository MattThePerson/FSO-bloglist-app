import { useState } from 'react'
import { Input, Button } from '../styledComponents'

/* LoginForm */
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    handleLogin(username, password, () => {
      setUsername('')
      setPassword('')
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Log in</h2>
      <div>
        <label>
          <Input aria-label='Username'
            value={username}
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          ></Input>
        </label>
      </div>
      <div>
        <label>
          <Input aria-label='Password'
            value={password}
            type="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          ></Input>
        </label>
      </div>
      <Button>login</Button>
    </form>
  )
}

export default LoginForm

