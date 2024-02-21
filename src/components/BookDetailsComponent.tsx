import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { BookObject } from '../interfaces/Book';

export const getBookQuery = gql`
    query($id: ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`

export default function BookDetailsComponent({bookId}: {bookId: string|null}) {

    const {loading, data} = useQuery(getBookQuery, {
        variables: {
            id: bookId,
        }
    });

  return (
    <div>
        <hr/>
        {
            loading && <p>Loading Book Details...</p>
        }
        {
            !loading && data && data.book && <>
                {
                    <>
                    <h1>Book Name: {data.book.name}</h1>
                    <p>Genre: {data.book.genre}</p>
                    <p>Author: {data.book.author.name}</p>
                    <p>Books by this author</p>
                    <ul>{data.book.author.books.map((book: BookObject)=>{
                        return (
                            <li key={book.id} >
                            <p>Name: {book.name}</p>
                            <p>Genre: {book.genre}</p>
                            </li>
                        )
                    })}</ul>
                    </>
                }
            </>
        }
        <hr/>
    </div>
  )
}
