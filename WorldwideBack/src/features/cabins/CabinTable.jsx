import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  //1 filter
  const filterdValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterdValue === 'all') filteredCabins = cabins;
  if (filterdValue === 'no')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterdValue === 'with')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // sortBy
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, directtion] = sortBy.split('-');
  const modifer = directtion === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifer
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
