import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LIMITED_NOTES, GET_FILTERED_BY_DATE } from '../../services/queries/noteQuery';
import { notesActions } from '../../store/slices/noteSlice';
import { Button, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { countActions } from '../../store/slices/filterSlice';

const Filter = () => {
  const page = useSelector((state) => state.pagination.page) || 1;
  const [openFilter, setOpenFilter] = useState(false);
  const [filterDate, setFilterDate] = useState({ from: '', to: '' });
  const dispatch = useDispatch();
  const { loading: isLoading, error: isError, data: filtered } = useQuery(GET_FILTERED_BY_DATE, {
    variables: { fromDate: filterDate.from, toDate: filterDate.to },
  });
  const { loading, error, data } = useQuery(GET_LIMITED_NOTES, {
    variables: { limit: "7", offset:  String((page - 1) * 7), fromDate: filterDate.from, toDate: filterDate.to },
  });

  if (!isLoading)  {
    const count = Math.ceil(filtered.filterByDate.length / 7);
    dispatch(countActions.setCount(count));
  }
  useEffect(() => {
    !loading &&
      !error &&
      dispatch(notesActions.setNotes(data.notesWithLimit))
  }, [filterDate, dispatch, error, loading, data, setFilterDate]);

  return (
    <>
      {openFilter ? (
        <>
          <TextField
            label="FROM"
            sx={{ padding: 0, height: 10 }}
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.from}
            onChange={({ target }) =>
              setFilterDate((oldFilterDate) => ({
                ...oldFilterDate,
                from: target.value,
              }))
            }
          />
          <TextField
            label="TO"
            sx={{ padding: 0, height: 10 }}
            InputLabelProps={{ shrink: true }}
            type="date"
            value={filterDate.to}
            onChange={({ target }) =>
              setFilterDate((oldFilterDate) => ({
                ...oldFilterDate,
                to: target.value,
              }))
            }
          />
          <Button
            variant="outlined"
            color="error"
            sx={{ padding: 0, width: 100, height: 50 }}
            onClick={() => setOpenFilter((oldOpenFilter) => !oldOpenFilter)}
          >
            Clear
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => setOpenFilter((oldOpenFilter) => !oldOpenFilter)}
        >
          <FilterAltIcon sx={{ width: 17 }}/>
          Filter By Date
        </Button>
      )}
    </>
  );
};

export default Filter;