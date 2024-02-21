import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BookObject } from '../interfaces/Book';
import BookComponents from './BookComponents';
import BookDetailsComponent from './BookDetailsComponent';

export const getBooksQuery = gql`
    {
        books{
            genre
            name
            id
        }
    }
`

export default function BookListComponent() {

    const {loading, error, data} = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] = useState<string|null>(null);

    if(loading) return <div>
        <h1>Loading...</h1>
    </div>

    if(error) return <div>
        <p>Error: {error.message}</p>
    </div>

  return (
    <div>
        <ul id='book-list'>
            {
                data && data.books && data.books.map((book: BookObject, index:number)=>{
                    return <BookComponents key={index} book={book} setSelectedBookId={setSelectedBookId} />
                })
            }
            {selectedBookId && <BookDetailsComponent bookId={selectedBookId} />}
        </ul>
    </div>
  )
}
