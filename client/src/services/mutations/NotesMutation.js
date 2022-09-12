import { gql } from '@apollo/client';

const ADD_NOTE = gql`
    mutation AddNote($name: String!, $surname: String!,  $email: String!, $phone: String!, $text: String!, $date: String!, $categoryId: Int!) {
        addNote(name: $name, surname: $surname, email: $email, phone: $phone, text: $text, date: $date, categoryId: $categoryId) {
            id
            name
            surname
            email
            phone
            text
            date
            category {
                category
            }
        }
    }
`;

const DELETE_NOTE = gql`
    mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
        }
    }
`;

export { ADD_NOTE, DELETE_NOTE };