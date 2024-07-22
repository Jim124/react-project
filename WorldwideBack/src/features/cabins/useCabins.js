import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';

export const useCabins = () => {
  const [searchParams] = useSearchParams();

  //Filter
  const filterVal = searchParams.get('discount') || 'all';
  console.log(filterVal);
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
  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ['cabins', filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });
  return { isLoading, cabins, error, count };
};
