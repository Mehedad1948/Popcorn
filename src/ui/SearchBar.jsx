import { useSearchParams } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e) {
    searchParams.set('search', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div className='grow basis-full  sm:basis-auto relative flex gap-3 items-center col-span-4
    h-full overflow-hidden
     sm:col-span-1'>
      <div className='relative w-full rounded-full overflow-hidden'>
        <input
          type='text'
          onChange={handleSearch}
          className='w-full px-4 peer sm:max-w-sm rounded-full placeholder:opacity-0'
          placeholder='tesr'
          required
        />
        <BiSearchAlt
          className='
        text-xl absolute top-2 left-3 opacity-100 text-blue-200 
        transition-transform duration-300
        peer-valid:-translate-x-[30px] block placeholder-shown:!block peer-focus:-translate-x-[30px] '
        />
      </div>
    </div>
  );
}

export default SearchBar;
