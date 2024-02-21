export interface BookObject{
    id: string;
    name: string;
    genre: string;
}

export interface AddBookFormObject{
    name: string;
    genre: string;
    AuthorId: string;
}