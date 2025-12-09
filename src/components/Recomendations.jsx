import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Recomendations = (props) => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: userResult.data?.me?.favoriteGenre },
    skip: !userResult.data?.me?.favoriteGenre,
  })

  if (!props.show) {
    return null
  }

  if (userResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = userResult.data?.me?.favoriteGenre

  if (!favoriteGenre) {
    return <div>No favorite genre set</div>
  }

  if (booksResult.loading) {
    return <div>loading books...</div>
  }

  const books = booksResult.data?.allBooks || []
  console.log(books)

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recomendations