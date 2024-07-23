import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constranst';

export const useCabins = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //Filter
  const filterVal = searchParams.get('discount') || 'all';
  let filter;
  if (filterVal === 'all') filter = null;
  if (filterVal === 'no')
    filter = { field: 'discount', value: 0, method: 'eq' };
  if (filterVal === 'with')
    filter = { field: 'discount', value: 0, method: 'gte' };
  // const filter =
  //   !filterVal || filterVal === 'all'
  //     ? null
  //     : { field: 'discount', value: filterVal, method: 'gte' };

  // sortBy
  const sortByRow = searchParams.get('sortBy') || 'created_at-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // query
  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ['cabins', filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });

  // prefetch query
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['cabins', filter, sortBy, page + 1],
      queryFn: () => getCabins({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['cabins', filter, sortBy, page - 1],
      queryFn: () => getCabins({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, cabins, error, count };
};
