import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constranst';
import toast from 'react-hot-toast';

export const useBookings = () => {
  const queryClient = useQueryClient();
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

  // query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    onError: (error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  // prefetch method
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // prefetch next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  // prefetch prev page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, error, count };
};
