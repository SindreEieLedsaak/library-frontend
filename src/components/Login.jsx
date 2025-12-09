import { gql } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const Login = ({ setToken, displayLogin, setDisplayLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN)

    const submit = async (event) => {
        event.preventDefault()
        const result = await login({ variables: { username, password } })
        const token = result.data.login.value
        setToken(token)
        setDisplayLogin(false)
    }

    return (
        <div style={{ display: displayLogin ? 'block' : 'none' }}>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username:
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login