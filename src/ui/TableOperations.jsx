import { useSearchParams } from 'react-router-dom';
// import Filter from './Filter';
import SortBy from './SortBy';
import FilterButton from './FilterButton';
import { memo, useState } from 'react';

const TableOperations = memo(function () {
  const [serachParams, setSearchParams] = useSearchParams();
  const [watchedTogether, setWatchedTogether] = useState(false);

  function handleClick(value) {
    serachParams.set('watchedTogether', !watchedTogether);
    setSearchParams(serachParams);
    setWatchedTogether(serachParams.get('watchedTogether') === 'true');
  }

  return (
    <div className='flex justify-between sm:justify-end flex-wrap py-2 gap-y-2 sm:gap-3'>
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
      
      </div> */}
      <FilterButton  onClick={() => handleClick()} active={watchedTogether}>
        {watchedTogether ? `Show All` : `Together`}
      </FilterButton>
      <SortBy
        options={[
          { value: 'ali-desc', label: 'Ali ⬇️' },
          { value: 'ali-asc', label: 'Ali ⬆️' },
          { value: 'mehdi-desc', label: 'Mehdi ⬇️' },
          { value: 'mehdi-asc', label: 'Mehdi ⬆️' },
          { value: 'mehrdad-desc', label: 'Mehrdad ⬇️' },
          { value: 'mehrdad-asc', label: 'Mehrdad ⬆️' },
        ]}
      />
      <SortBy
        options={[
          { value: 'total-desc', label: 'Total ⬇️' },
          { value: 'total-asc', label: 'Total ⬆️' },
          { value: 'imdb-desc', label: 'IMDB ⬇️' },
          { value: 'imdb-asc', label: 'IMDB ⬆️' },
        ]}
      />
    </div>
  );
});

export default TableOperations;
