import { useSearchParams } from 'react-router-dom';
// import Filter from './Filter';
import SortBy from './SortBy';
import FilterButton from './FilterButton';
import { memo, useContext, useState } from 'react';
import SearchBar from './SearchBar';
import { appContext } from '../ContextPeovider';

const TableOperations = memo(function () {
  const [serachParams, setSearchParams] = useSearchParams();
  const [watchedTogether, setWatchedTogether] = useState(false);
  const { showSearchbar, setShowSearchbar } = useContext(appContext);

  function handleClick(value) {
    serachParams.set('watchedTogether', !watchedTogether);
    setSearchParams(serachParams);
    setWatchedTogether(serachParams.get('watchedTogether') === 'true');
  }

  return (
    <div
      className={
        (showSearchbar
          ? 'grid-rows-[43px,auto] gap-y-2'
          : 'grid-rows-[0px,auto]') +
        ' ' +
        `grid sm:grid-rows-[auto,auto] sm:grid-cols-[1fr,auto,auto,auto] gap-x-4 items-center
     sm:justify-end flex-wrap py-2 sm:py-4 overflow-hidden
     transition-all duration-300 px-1 sm:gap-x-3 justify-between`
      }
    >
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
      <SearchBar />
      {/* <span className='grow'></span> */}
      <FilterButton onClick={() => handleClick()} active={watchedTogether}>
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
          { value: 'variance-desc', label: 'Variance ⬇️' },
          { value: 'variance-asc', label: 'Variance ⬆️' },
          { value: 'year-desc', label: 'Year ⬇️' },
          { value: 'year-asc', label: 'Year ⬆️' },
          { value: 'imdb-desc', label: 'IMDB ⬇️' },
          { value: 'imdb-asc', label: 'IMDB ⬆️' },
        ]}
      />
    </div>
  );
});

export default TableOperations;
