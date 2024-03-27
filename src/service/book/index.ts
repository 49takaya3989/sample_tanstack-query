import { useQuery } from '@tanstack/react-query'
import { pokemonKeys } from './key'
import { searchBooks } from './function'

export const useBooks = (searchWord: string) => {
  const {data, refetch} = useQuery({
    queryKey: pokemonKeys.list(searchWord),
    queryFn: () => searchBooks(searchWord),
    enabled: false // コンポーネントのマウント時にクエリが自動で実行されないようにします。
  })

  console.log('data', data);

  return { data, refetch }
}