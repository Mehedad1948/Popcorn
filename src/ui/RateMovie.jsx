import { useContext, useState } from 'react';
import { useMovie } from '../hooks/useMovies';
import Loading from './Loading';
import Table from './Table';
import { useRate } from '../hooks/useRate';
import { userContext } from './ProtectedRoute';
// import { MdOutlineVisibilityOff } from 'react-icons/md';

function RateMovie() {
  const { data, isLoading } = useMovie();
  const [filter, setFilter] = useState(false);
  const { userName } = useContext(userContext);
  const [ratingMovie, setRatingMovie] = useState('');
  const { rateMovie, isRating } = useRate();

  const filteredMovies = filter
    ? data?.filter((movie) => movie[userName] === 0)
    : data;

  function hadleRate(rateObj) {
    rateMovie(rateObj);
    setRatingMovie(rateObj.movieId);
  }

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className='max-w-2xl '>
      <div className='pb-3 flex justify-end'>
        <button
          onClick={() => setFilter((s) => !s)}
          className='bg-[#6741d9] text-sm sm:text-base w-fit px-3 py-3 rounded cursor-pointer text-white
           hover:bg-[#5434b6] col-span-2 mr-0 mx-auto font-semibold mt-2.5 sm:mt-3'
        >
          {filter ? 'Show all' : 'Show unrated movies'}
        </button>
      </div>
      <div
        className='w-full h-full overflow-x-auto rounded-md sm:rounded-lg border-2
                     border-blue-400 drop-shadow-md'
      >
        <Table columns={`0.2fr 1fr 0.5fr 0.5fr`}>
          <Table.Header>
            <th>#</th>
            <th>Movie</th>
            <th className='text-center'>Rate</th>
            <th></th>
          </Table.Header>
          <Table.Body
            isLoading={isLoading}
            data={filteredMovies}
            render={(movie, index) => (
              <RowRate
                userName={userName}
                key={movie.id}
                movie={movie}
                index={index}
                rateMovie={rateMovie}
                isRating={isRating}
                hadleRate={hadleRate}
                ratingMovie={ratingMovie}
              />
            )}
          />
          {/* <Table.Footer></Table.Footer> */}
        </Table>
      </div>
    </div>
  );
}

function RowRate({ index, movie, userName, isRating, hadleRate, ratingMovie }) {
  const [movieRate, setMovieRate] = useState(movie[userName]);
  // const [isWatched, setIsWatched] = useState(true);
  
  return (
    <Table.Row>
      <td className='flex items-center justify-center sm:justify-start'>
        {index + 1}
      </td>
      <td className='flex items-center text-left justify-start'>
        {movie.movie}
      </td>
      <td className='flex items-center justify-center'>
        {/* <MdOutlineVisibilityOff /> */}
        <input
          className='text-center w-16 sm:w-28 h-fit mx-auto py-0.5 sm:py-1'
          type='number'
          value={movieRate}
          onChange={(e) => setMovieRate(e.target.value)}
        />
      </td>
      <td className='flex  justify-center'>
        <button
          onClick={() =>
            hadleRate({
              movieId: movie.id,
              updateObj: { [userName]: movieRate },
            })
          }
          className=' w-fit  cursor-pointer text-white text-sm sm:text-base
             items-center flex  col-span-2 font-semibold '
        >
          <span
            className='h-fit bg-[#6741d9] rounded hover:bg-[#5434b6]
                       hover:ring-2 ring-orange-500 px-3 py-1.5'
          >
            {isRating && ratingMovie === movie.id ? 'Rating...' : 'Submit'}
          </span>
        </button>
      </td>
    </Table.Row>
  );
}

export default RateMovie;
