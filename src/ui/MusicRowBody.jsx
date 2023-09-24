import { useContext } from 'react';
import Table from './Table';
import { FaPlay, FaPause } from 'react-icons/fa';
import { ImDownload } from 'react-icons/im';
import { HiTrash } from 'react-icons/hi';
import { appContext } from '../ContextPeovider';
import RatingStars from './RatingStars';
import { useRateMusic } from '../hooks/useRateMusic';
import ModalB from './ModalB';
import ConfirmDelete from './ConfirmDelete';
import { useDeleteMusic } from '../hooks/useDeleteMusic';
import PlayerLoader from './PlayerLoader';

function MusicRowBody({ music, index, userName }) {
  const { currentMusic, handleToggleMusic, isPlaying } = useContext(appContext);

  const { deleteMusic, isDeletingMusic } = useDeleteMusic();

  const { rateMusic, isRatingMusic } = useRateMusic();

  const handleDownload = () => {
    const musicUrl = music.musicUrl;

    if (musicUrl) {
      const a = document.createElement('a');
      a.href = musicUrl;
      a.download = 'music.mp3'; // You can set the desired filename here
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const { name, id, composer, rating, cover, coverName } = music;

  const isActice = index === currentMusic && isPlaying;

  function onSetRating(rating) {
    rateMusic({ userName, id, rating });
  }

  return (
    <Table.Row
      className={
        isDeletingMusic
          ? '!bg-rose-800/60'
          : isActice
          ? '!bg-gradient-to-l from-purple-400/40 to-purple-700/40'
          : index === currentMusic
          ? '!bg-gradient-to-l from-purple-400/20 to-purple-700/20'
          : ''
      }
    >
      <td className='!text-left sm:!text-center pl-1 relative sm:pl-0'>
        {index + 1}
      </td>
      <td
        className='!text-left grid grid-cols-[64px,_auto] items-center gap-3 sm:gap-4 cursor-pointer'
        onClick={() => handleToggleMusic(index)}
      >
        <div className='relative'>
          <img
            className='w-16 min-w-[64px] shrink-0 rounded aspect-square object-cover'
            src={cover}
          />
          {isActice && <PlayerLoader />}
        </div>

        <div className='flex gap-2 flex-wrap'>
          <span> {name}</span>-<span>{composer}</span>
        </div>
      </td>
      <td className='!text-left '>{rating} ⭐</td>
      <td className='!text-left  pl-3 sm:pl-0'>
        <RatingStars
          defaultRating={music[userName]}
          onSetRating={onSetRating}
        />
      </td>

      <td className='!text-left flex items-center justify-evenly sm:justify-start pl-2 sm:gap-8'>
        <button
          className='focus:outline-none'
          onClick={() => handleToggleMusic(index)}
        >
          {index === currentMusic && isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className='hover:text-emerald-400' onClick={handleDownload}>
          <ImDownload />
        </button>
        <ModalB>
          <ModalB.Open opens='confirm'>
            <button
              className=' hover:text-[#ff0064]
          !font-medium px-1 aspect-square py-0.5 rounded'
            >
              <HiTrash />
            </button>
          </ModalB.Open>
          <ModalB.Window name='confirm'>
            <ConfirmDelete
              onConfirm={() => deleteMusic({ id, name, coverName })}
              name={name}
            />
          </ModalB.Window>
        </ModalB>
      </td>
    </Table.Row>
  );
}

export default MusicRowBody;
