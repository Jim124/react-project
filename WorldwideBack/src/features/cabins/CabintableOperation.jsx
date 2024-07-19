import { Filter } from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

export const CabintableOperation = () => {
  return (
    <TableOperations>
      <Filter
        filterField={'discount'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'no', label: 'No discount' },
          { value: 'with', label: 'With discount' },
        ]}
      />
    </TableOperations>
  );
};
