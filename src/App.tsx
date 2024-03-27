import { ComponentProps, useState } from 'react';
import './App.css'
import { useBooks } from './service/book'

function App() {
  const [searchWord, setSearchWord] = useState('');
  const {data, refetch} = useBooks(searchWord);

  const onSubmit:ComponentProps<'form'>["onSubmit"] = (e) => {
    e.preventDefault();
    refetch();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name='text' value={searchWord} onChange={(val) => setSearchWord(val.currentTarget.value)} />
        <button type='submit'>検索</button>
      </form>

      <h1>LIST</h1>
      {
        data && data.items.length > 0
        ? (
          <ul>
            {data?.items.map(item => <li key={item.id}>{item.volumeInfo.title}</li>)}
          </ul>
        )
        : undefined
      }
    </div>
  )
}

export default App
