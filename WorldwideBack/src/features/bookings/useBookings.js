import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
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
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, bookings, error };
};
