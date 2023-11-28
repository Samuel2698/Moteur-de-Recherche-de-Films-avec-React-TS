import { SearchMoviesProps } from '../interfaces/Movies'

const apiKey = import.meta.env.VITE_API_KEY

export async function searchMovies({ search }: { search: string | undefined }) {
  if (search === '') return

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`
    )
    const data = await res.json()

    const movies: SearchMoviesProps[] | undefined = data.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (err) {
    throw new Error('Impossible de trouver des films')
  }
}
