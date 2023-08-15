import Table from './Table';
import { useDeleteMovie } from '../hooks/useDeleteMovie';
import { useEffect, useState } from 'react';
import ModalB from './ModalB';
import ConfirmDelete from './ConfirmDelete';

function RowBody({ movie, index, userName }) {
  const { imdb, mehdi, mehrdad, ali, total, year, id } = movie;
  const { deleteMovie, isDeleting } = useDeleteMovie();
  const [shouldHide, setShouldHide] = useState(false);
  const [isEveryBodyRated, setIsEveryBodyRated] = useState(false);

  useEffect(() => {
    if (movie[userName] === 0) setShouldHide(true);
    if (ali !== 0 && mehdi !== 0 && mehrdad !== 0) {
      setIsEveryBodyRated(true);
    }
  }, [shouldHide, userName, movie]);

  function setColor(rate) {
    const colorValue = Math.round((rate / 10) * 255); // Map rate to a color value (0-255)
    return `rgb(${255 - colorValue}, ${colorValue}, 100)`;
  }

  return (
    <Table.Row>
      <td className='!text-left sm:!text-center'>{index + 1}</td>
      <td className='text-left'>
        {movie.movie} - {year}
      </td>
      <td
        className={
          shouldHide && userName !== 'ali' && ali !== 0 ? 'blur-[5px]' : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(ali),
          }}
        >
          {ali}
        </span>
      </td>
      <td
        className={
          shouldHide && userName !== 'mehdi' && mehdi !== 0 ? 'blur-[5px]' : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(mehdi),
          }}
        >
          {mehdi}
        </span>
      </td>
      <td
        className={
          shouldHide && userName !== 'mehrdad' && mehrdad !== 0
            ? 'blur-[5px]'
            : ''
        }
      >
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(mehrdad),
          }}
        >
          {mehrdad}
        </span>
      </td>
      <td className='flex justify-center sm:justify-start gap-3'>
        <span
          className={
            (!isEveryBodyRated ? 'blur-[5px]' : '') +
            ' ' +
            'border-b-2 h-fit px-2 rounded-full'
          }
          style={{
            borderColor: setColor(total),
          }}
        >
          {total}
        </span>
        {total < 6 && isEveryBodyRated && (
          <img className='h-7 rounded-full' src='/pish.jpg' alt='💩' />
        )}
        {total >= 8.4 && total < 9.4 && <span>🌟</span>}
        {total >= 9.4 && total <= 10 && <span>🦄</span>}
      </td>
      <td>
        <span
          className=' border-b-2  px-2 rounded-full'
          style={{
            borderColor: setColor(imdb),
          }}
        >
          {imdb}
        </span>
      </td>
      <td>
        <ModalB>
          <ModalB.Open opens='confirm'>
            <button
              className='hover:bg-rose-500/20 text-[#ff0064]
          !font-medium px-2.5 py-0.5 rounded'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </ModalB.Open>
          <ModalB.Window name='confirm'>
            <ConfirmDelete onConfirm={() => deleteMovie(id)} movie={movie.movie} />
          </ModalB.Window>
        </ModalB>
      </td>
    </Table.Row>
  );
}

export default RowBody;
