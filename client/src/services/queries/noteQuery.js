import { gql } from '@apollo/client';

const GET_NOTES = gql`
    query getNotes {
        notes {
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
`

const GET_NOTE_TEXT = gql`
    query getNoteText($id: ID!) {
        note(id: $id) {
            text
        }
    }
`

const GET_FILTERED_BY_DATE = gql`
    query getFiltered($fromDate: String!, $toDate: String!) {
        filterByDate(fromDate: $fromDate, toDate: $toDate) {
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
`

const GET_LIMITED_NOTES = gql`
    query getLimitedNotes($limit: String!, $offset: String!, $fromDate: String!, $toDate: String!) {
      notesWithLimit(limit: $limit, offset: $offset, fromDate: $fromDate, toDate: $toDate) {
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
`
const TOTAL_AMOUNT = gql`
  query getTotalAmount {
    totalCount
  }
`

export { GET_NOTES, GET_NOTE_TEXT, GET_FILTERED_BY_DATE, GET_LIMITED_NOTES, TOTAL_AMOUNT };
