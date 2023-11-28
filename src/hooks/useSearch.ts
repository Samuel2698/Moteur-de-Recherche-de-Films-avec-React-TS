import { useEffect, useRef, useState } from 'react'

export function useSearch() {
  const [search, setSearch] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Il doit y avoir du contenu')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('Ne doit contenir des chiffres')
      return
    }
    if (search.length < 3) {
      setError('Doit contenir plus de 3 caractères')
      return
    }
    setError(null)
  }, [search])

  return { error, search, setSearch }
}
