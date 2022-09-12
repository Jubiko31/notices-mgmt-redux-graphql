import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { pageActions } from '../../store/slices/paginationSlice';
import { TOTAL_AMOUNT } from '../../services/queries/noteQuery';

const TablePagination = () => {
    const dispatch = useDispatch();
    const {loading, error, data} = useQuery(TOTAL_AMOUNT);

    if (loading) return 'Fetching data...'
    const count = Math.ceil(data.totalCount / 7)
    const setPagination = (e, page) => {
        dispatch(pageActions.slide(page));
    };

    return (
        <Pagination
            count={count}
            variant="contained"
            onChange={setPagination}
        />
    );
};

export default TablePagination;