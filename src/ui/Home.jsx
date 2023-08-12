import { useContext } from 'react';
import { useMovie } from '../hooks/useMovies';
import Loading from './Loading';
import RowBody from './RowBody';
import Table from './Table';
import TableOperations from './TableOperations';
import { userContext } from './ProtectedRoute';

function Home() {
  const { data, isLoading } = useMovie();

  const { userName } = useContext(userContext);

  if (isLoading) {
   return <Loading />;
  }

  return (
    <Main>
      <TableOperations />
      <div className='w-full h-full overflow-x-auto rounded-md sm:rounded-lg border-2 border-blue-400 drop-shadow-md'>
        <Table
          style='secondary'
          columns={`0.3fr 1fr 0.5fr 0.5fr 0.8fr 0.5fr 0.5fr 0.2fr`}
        >
          <Table.Header>
            <th>#</th>
            <th className='text-left'>Movie</th>
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
            data={data}
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
    </Main>
  );
}

function Main({ children }) {
  return <main className='main h-full flex flex-col gap-3'>{children}</main>;
}

export default Home;
