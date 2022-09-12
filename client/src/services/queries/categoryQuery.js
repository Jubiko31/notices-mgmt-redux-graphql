import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
    query getCategories {
        categories {
            id
            category
        }

    }
`

export { GET_CATEGORIES };