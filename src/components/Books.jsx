import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { useState } from 'react'

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author{
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS)

  const filteredResult = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
    skip: filter === null,
  })

  if (!props.show) {
    return null
  }

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }


  const allBooks = allBooksResult.data.allBooks
  const genres = [...new Set(allBooks.flatMap((book) => book.genres))]


  const books = filter ? (filteredResult.data?.allBooks || []) : allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
