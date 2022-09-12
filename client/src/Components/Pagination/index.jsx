import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { pageActions } from '../../store/slices/paginationSlice';
import { countActions } from '../../store/slices/filterSlice'
import { TOTAL_AMOUNT } from '../../services/queries/noteQuery';

const TablePagination = () => {
    const count = useSelector((state) => state.count.count);
    const dispatch = useDispatch();
    const {loading, error, data} = useQuery(TOTAL_AMOUNT);
    if (loading) return 'Fetching data...'
    
    if (!loading) {
       const newCount = Math.ceil(data.totalCount / 7);
       dispatch(countActions.setCount(newCount))
    }
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