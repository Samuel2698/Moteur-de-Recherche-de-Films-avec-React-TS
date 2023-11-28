import { MovieListProps, MoviesProps } from '../interfaces/Movies'

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="movies">
      {movies?.map((movie, index) => (
        <li className="movie" key={`${movie.id}-${index}`}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} loading="lazy" />
        </li>
      ))}
    </ul>
  )
}

function NoMovies() {
  return <p style={{ textAlign: 'center' }}>Il n'y a pas de films</p>
}

export function Movies({ movies }: MoviesProps) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <MovieList movies={movies} /> : <NoMovies />
}
