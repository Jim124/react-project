import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { se } from 'date-fns/locale';
export const useBookings = () => {
  const [searchParams] = useSearchParams();

  //Filter
  const filterVal = searchParams.get('status');
  const filter =
    !filterVal || filterVal === 'all'
      ? null
      : { field: 'status', value: filterVal, method: 'eq' };

  // sortBy
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
};
