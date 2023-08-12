import Table from './Table';
import { useDeleteMovie } from '../hooks/useDeleteMovie';
import { useEffect, useState } from 'react';

function RowBody({ movie, index, userName }) {
  const { deleteMovie, isLoading } = useDeleteMovie();
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    if (movie[userName] === 0) setShouldHide(true);
  }, [shouldHide, userName, movie]);

  function setColor(rate) {
    const colorValue = Math.round((rate / 10) * 255); // Map rate to a color value (0-255)
    return `rgb(${255 - colorValue}, ${colorValue}, 100)`;
  }

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td className='text-left'>{movie.movie} - {movie.year}</td>
      <td
        className={
          shouldHide && userName !== 'ali' && movie.ali !== 0
            ? 'blur-[4px]'
            : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(movie.ali),
          }}
        >
          {movie.ali}
        </span>
      </td>
      <td
        className={
          shouldHide && userName !== 'mehdi' && movie.mehdi !== 0
            ? 'blur-[4px]'
            : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(movie.ali),
          }}
        >
          {movie.mehdi}
        </span>
      </td>
      <td
        className={
          shouldHide && userName !== 'mehrdad' && movie.mehrdad !== 0
            ? 'blur-[4px]'
            : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(movie.ali),
          }}
        >
          {movie.mehrdad}
        </span>
      </td>
      <td className='flex jus gap-3'>
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(movie.ali),
          }}
        >
          {movie.total}
        </span>
        {movie.total < 6 && (
          <img className='h-7 rounded-full' src='/pish.jpg' alt='💩' />
        )}
        {movie.total > +8.5 && <span>🌟</span>}
      </td>
      <td>
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(movie.ali),
          }}
        >
          {movie.imdb}
        </span>
      </td>
      <td>
        <button
          onClick={() => deleteMovie(movie.id)}
          className='hover:bg-rose-500/20 text-[#ff0064]
                      !font-medium px-2.5 py-0.5 rounded'
        >
          Delete
        </button>
      </td>
    </Table.Row>
  );
}

export default RowBody;
