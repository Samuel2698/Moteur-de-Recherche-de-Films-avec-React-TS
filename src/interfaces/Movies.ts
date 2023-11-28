interface Movie {
  id: string
  title: string
  year: string
  poster: string
}

export interface MovieListProps {
  movies: Movie[]
}

export interface MoviesProps {
  movies: Movie[]
}

export interface SearchMoviesProps {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface getMoviesProps {
  id: string
  title: string
  year: string
  poster: string
}
