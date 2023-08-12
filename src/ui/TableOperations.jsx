import { useSearchParams } from 'react-router-dom';
import Filter from './Filter';
import SortBy from './SortBy';
import FilterButton from './FilterButton';
import { memo, useState } from 'react';

const TableOperations = memo(function () {
  const [serachParams, setSearchParams] = useSearchParams();
  const [priority, setPriority] = useState();


  function handleClick(value) {
    serachParams.set('priority', !priority);
    setSearchParams(serachParams);
    setPriority(serachParams.get('priority') === 'true');
  }
  
  return (
    <div className="flex justify-between sm:justify-end flex-wrap py-2 gap-y-2 sm:gap-3">
      {/* <div className="flex items-center gap-3">
        <Filter
          filterField="status"
          options={[
            { value: 'all', label: 'All' },
            { value: 'delivered', label: 'Delivered'},
            { value: 'pending', label: 'Pending'},
            { value: 'unconfirmed', label: 'Unconfirmed'},
          ]}
        />
        <FilterButton
          onClick={() => handleClick()}
          active={priority}
        >
          Priority
        </FilterButton>
      </div> */}
       <SortBy
        options={[
          { value: 'ali-desc', label: 'Sort by Ali ⬇️' },
          { value: 'ali-asc', label: 'Sort by Ali ⬆️' },
          { value: 'mehdi-desc', label: 'Sort by Mehdi ⬇️' },
          { value: 'mehdi-asc', label: 'Sort by Mehdi ⬆️' },
          { value: 'mehrdad-desc', label: 'Sort by Mehrdad ⬇️' },
          { value: 'mehrdad-asc', label: 'Sort by Mehrdad ⬆️' },
        ]}
      />
      <SortBy
        options={[
          { value: 'total-desc', label: 'Sort by Total ⬇️' },
          { value: 'total-asc', label: 'Sort by Total ⬆️' },
          { value: 'imdb-desc', label: 'Sort by IMDB ⬇️' },
          { value: 'imdb-asc', label: 'Sort by IMDB ⬆️' },
        ]}
      />
     
    </div>
  );
});

export default TableOperations;