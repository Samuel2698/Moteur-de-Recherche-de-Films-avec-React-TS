import { useCallback, useState } from 'react'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import { Main } from './components/Main'
import debounce from 'just-debounce-it'
import './App.css'

function App() {
  const [sort, setSort] = useState(false)
  const { error, search, setSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      getMovies({ search })
    }, 400),
    [getMovies]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="app">
      <header>
        <h1>Moteur de Recherche de Films 🎞️</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={error ? 'input-text-error' : 'input-text'}
            onChange={handleChange}
            value={search}
            placeholder="Barbie, Oppenheimer..."
            required
          />
          <input
            onChange={handleSort}
            type="checkbox"
            checked={sort}
            className="input-sort"
          />
          <button>Chercher</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <Main loading={loading} movies={movies} />
    </div>
  )
}

export default App
