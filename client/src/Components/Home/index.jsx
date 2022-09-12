import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Stack, Button } from '@mui/material';
import TablePagination from '../Pagination';
import TransitionsModal from '../Modals/textModal';
import { GET_LIMITED_NOTES } from '../../services/queries/noteQuery'
import { notesActions } from '../../store/slices/noteSlice';
import { pageActions } from '../../store/slices/paginationSlice';

const columns = [
  { id: 'name', label: 'Name', minWidth: 70 },
  { id: 'surname', label: 'Surname', minWidth: 70 },
  { id: 'email', label: 'Email', minWidth: 70 },
  { id: 'phone', label: 'Phone', minWidth: 70 },
  { id: 'categoryId', label: 'Category', minWidth: 70 },
  { id: 'date', label: 'Date', minWidth: 70 },
  { id: 'text', label: 'Note', minWidth: 30 },
];

export default function StickyHeadTable() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.pagination.page) || 1;
  const { loading, error, data } = useQuery(GET_LIMITED_NOTES, {
    variables: { limit: "7", offset:  String((page - 1) * 7)  },
  });
  
  const { notes } = useSelector((state) => state.notes)
  useEffect(() => {
    !loading && 
      !error &&
      dispatch(notesActions.setNotes(data.notesWithLimit))
  }, [data, dispatch, error, loading])

  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleOpen = (value) => {
    setNotice(value)
    setOpen(true)
  }
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    dispatch(pageActions.slide(newPage))
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    dispatch(pageActions.slide(0))
  };

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {open && (
        <TransitionsModal setOpen={setOpen} open={open} notice={notice}/>
      )}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                   <strong>{column.label}</strong> 
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
              notes
              .map((row) => {
                  let delId;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (column.id === 'text') {
                          value = <Button onClick={() => handleOpen(row[column.id])}>Read More</Button>
                        }
                        if (column.id === 'categoryId') {
                          value = row.category.category
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            { value }
                          </TableCell>
                         
                        );
                      })}
                            <TableCell sx={{ mr: 4 }}>
                              <Button 
                                variant="contained" 
                                color="error" sx={{ width: 1.7 }}
                              >
                              <DeleteRoundedIcon sx={{ color: '#fff' }}/>
                              </Button>
                            </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 50]}
          component="div"
          count={!loading && notes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper></>
  );
}
