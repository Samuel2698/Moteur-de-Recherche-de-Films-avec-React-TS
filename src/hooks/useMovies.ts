import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'
import { getMoviesProps } from '../interfaces/Movies'

export function useMovies({
  search,
  sort
}: {
  search: string | undefined
  sort: boolean
}) {
  const [movies, setMovies] = useState<getMoviesProps[]>([])
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [error, setError] = useState<string | null>(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }: { search: string }) => {
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovie = await searchMovies({ search })
      setMovies(newMovie || [])
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur inconnue s'est produite")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
