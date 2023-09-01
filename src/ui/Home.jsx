import { useContext, useEffect, useState } from 'react';
import { useMovie } from '../hooks/useMovies';
import RowBody from './RowBody';
import Table from './Table';
// import Button from './Button';
import TableOperations from './TableOperations';
import { userContext } from './ProtectedRoute';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
// import { PAGE_SIZE } from '../utils/constants';

function Home() {
  const { data, count, isLoading } = useMovie();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterdData, setFilterdData] = useState([]);

  const searchedInput = searchParams.get('search') || '';

  const { userName } = useContext(userContext);

  useEffect(() => {
    setFilterdData(data);
  }, data);

  useEffect(() => {
    setFilterdData(
      data?.filter((item) =>
        item.movie.toLowerCase().includes(searchedInput.toLowerCase())
      )
    );
    console.log(searchedInput, filterdData);
  }, [searchedInput]);

  return (
    <Main>
      <TableOperations />
      <div
        className='w-full h-full overflow-x-auto rounded-md sm:rounded-lg border-2
                   border-blue-400 drop-shadow-md'
      >
        <Table
          style='secondary'
          columns={`0.2fr 1.3fr 0.5fr 0.5fr 0.7fr 0.5fr 0.5fr 0.2fr`}
        >
          <Table.Header>
            <th className='text-left sm:text-center'>#</th>
            <th className='text-left'>Movie ( {count} )</th>
            <th>Ali</th>
            <th>Mehdi</th>
            <th>Mehrdad</th>
            <th>Total</th>
            <th>IMDB</th>
            <th>
              <button
                className='hover:bg-rose-500/20 text-rose-500 opacity-0
                      !font-medium px-2.5 py-0.5 rounded'
              >
                Delete
              </button>
            </th>
          </Table.Header>
          <Table.Body
            isLoading={isLoading}
            data={filterdData}
            render={(movie, index) => (
              <RowBody
                userName={userName}
                key={movie.id}
                movie={movie}
                index={index}
              />
            )}
          />
        </Table>
      </div>
      {/* <Pagination /> */}
    </Main>
  );
}

function Main({ children }) {
  return <main className='main h-full flex flex-col gap-0 '>{children}</main>;
}

// function Pagination({ count }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = !searchParams.get('page')
//     ? 1
//     : Number(searchParams.get('page'));

//   const pageCount = Math.ceil(count / PAGE_SIZE);

//   function nextPage() {
//     const next = currentPage === pageCount ? currentPage : currentPage + 1;

//     searchParams.set('page', next);
//     setSearchParams(searchParams);
//   }

//   function prevPage() {
//     const prev = currentPage === 1 ? currentPage : currentPage - 1;

//     searchParams.set('page', prev);
//     setSearchParams(searchParams);
//   }

//   if (pageCount <= 1) return null;

//   return (
//     <div className='flex items-center py-2'>
//       <Button size='small' onClick={prevPage} disabled={currentPage === 1}>
//         <HiChevronLeft /> <span>Previous</span>
//       </Button>
//       <span>x</span>
//       <Button
//         size='small'
//         onClick={nextPage}
//         disabled={currentPage === pageCount}
//       >
//         <span>Next</span>
//         <HiChevronRight />
//       </Button>
//       <p>
//         Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
//         <span>
//           {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
//         </span>{' '}
//         of <span>{count}</span> results
//       </p>
//     </div>
//   );
// }

export default Home;
