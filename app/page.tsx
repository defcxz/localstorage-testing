'use client'


import { useState, useEffect } from 'react'

export default function Home() {

  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<string[]>([])
  let counter = 0


  useEffect(() => {
    let storedItems = []
    let key : any

    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i)
      const value = localStorage.getItem(key);
      storedItems.push(value)
    }
    setItems(storedItems.filter(item => item !== null) as string[]); 
  }, [])


  const handleSubmit = (e: { preventDefault: () => void }) => {
    counter = localStorage.length + 1
    const newItems = [...items, inputValue]
    setItems(newItems)
  }

  const handleClear = () => {
    localStorage.clear()
    setItems([])
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-5 md:p-24">
      <h1 className="text-4xl font-bold text-center mb-20">
        localStorage testing
      </h1>
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <input
            className="p-2 rounded-md" 
            type='text' 
            id='inputValue' 
            placeholder='What are you thinking?'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button> 
        </form>
        <h2 className="text-xl text-bold text-center mt-20">
          Your localStorage saved items
        </h2>

        {items.length > 0 ? (
          <table className="table-auto mt-5">
            <thead>
              <tr>
                <th className="px-4 py-2">Key</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5">You dont have anything saved.</p>
        )}

        <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5' onClick={handleClear}>Clear {items.length} localStorage items</button>
    </main>
  )
}
