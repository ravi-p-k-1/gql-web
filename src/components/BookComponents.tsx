import React from 'react'
import { BookObject } from '../interfaces/Book'

export default function BookComponents({book, setSelectedBookId}:{book: BookObject, setSelectedBookId: React.Dispatch<React.SetStateAction<string|null>>}) {
  return (
    <li onClick={(e)=>{
      setSelectedBookId(book.id);
    }}>
        Name: {book.name}
        <br/>
        Genre: {book.genre}
    </li>
  )
}
