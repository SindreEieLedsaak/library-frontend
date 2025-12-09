import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recomendations from './components/Recomendations'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [displayLogin, setDisplayLogin] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])
  const handleSetToken = (newToken) => {
    setToken(newToken)
    if (newToken) {
      localStorage.setItem('library-user-token', newToken)
    } else {
      localStorage.removeItem('library-user-token')
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setDisplayLogin(true)}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => handleSetToken(null)}>logout</button>}
      </div>



      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      {console.log(token)}
      {!token && (
        <Login setToken={handleSetToken} displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
      )}
      {token && (
        <>
          <NewBook show={page === 'add'} />
          <Recomendations show={page === 'recommend'} />
        </>
      )}
      
    </div>
  )
}

export default App
