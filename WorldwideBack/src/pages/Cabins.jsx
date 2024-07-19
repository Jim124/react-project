import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddCabin from '../features/cabins/AddCabin';
import { CabintableOperation } from '../features/cabins/CabintableOperation';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabintableOperation />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
      <Row></Row>
    </>
  );
}

export default Cabins;
