import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AuthorObject } from '../interfaces/Author';
import { AddBookFormObject } from '../interfaces/Book';
import { getBooksQuery } from './BookListComponent';

export const getAuthorsQuery = gql`
    {
        authors{
            id
            name
        }
    }
`;

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $AuthorId: ID!){
        addBook(name: $name, genre: $genre, AuthorId: $AuthorId){
            name
            id
        }
    }
`

export default function AddBookComponent() {

    const [addBookFormObject, setAddBookFormObject] = useState<AddBookFormObject>({
        name: '',
        genre: '',
        AuthorId:'',
    });
    const {loading, error, data} = useQuery(getAuthorsQuery);
    const [addBookMutateFunction, addBookMutateResponse] = useMutation(addBookMutation);
    

    const formChangeHandler=(name:string, value:string)=>{
        setAddBookFormObject({
            ...addBookFormObject,
            [name]: value,
        });
    };

    const onSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(addBookFormObject);
        await addBookMutateFunction({variables: {...addBookFormObject}, refetchQueries: [{query: getBooksQuery}]})
        console.log(addBookMutateResponse);
    }

  return (
    <div>
        <form onSubmit={(e)=>onSubmit(e)} >
            <div>
                <label>Book Name: </label>
                <input type='text' name='name' onChange={(e)=>{formChangeHandler(e.target.name, e.target.value)}} />
            </div>
            <div>
                <label>Genre: </label>
                <input type='text' name='genre' onChange={(e)=>{formChangeHandler(e.target.name, e.target.value)}} />
            </div>
            <div>
                <label>Author: </label>
                <select name='AuthorId' onChange={(e)=>{formChangeHandler(e.target.name, e.target.value)}}  >
                    <option key={''} >
                        select author
                    </option>
                    {
                        data && data.authors && data.authors.map((author: AuthorObject)=>{
                            if(loading){
                                return <option>Loading Authors...</option>
                            }
                            if(error){
                                return <option>Error: {error.message}</option>
                            }
                            return (
                                <option key={author.id} value={author.id} > {author.name} </option>
                            )
                        })
                    }
                </select>
            </div>
            <button type='submit'>+</button>
        </form>
    </div>
  )
}
