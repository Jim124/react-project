import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays();
  if (isLoading1 || isLoading2) return <Spinner />;
  console.log(bookings);
  console.log(stays);
  console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today's activity</div>
      <div>Today's activity</div>
      <div>Today's activity</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
