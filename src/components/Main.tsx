import { Movies } from './Movies'
import { getMoviesProps } from '../interfaces/Movies'

export function Main({
  loading,
  movies
}: {
  loading: boolean
  movies: getMoviesProps[]
}) {
  return (
    <main>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <Movies movies={movies} />
      )}
    </main>
  )
}
