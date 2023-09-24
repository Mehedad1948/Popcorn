import { useContext } from 'react';
import { useMusics } from '../hooks/useMusics';
import MusicRowBody from './MusicRowBody';
import RowBody from './RowBody';
import Table from './Table';
import { userContext } from './ProtectedRoute';
import MusicPlayer from './MusicPlayer';
import ModalB from './ModalB';
import UploadMusicForm from './UploadMusicForm';
import { useSearchParams } from 'react-router-dom';
import { CgArrowDown } from 'react-icons/cg';

function Music() {
  const { data, isLoading } = useMusics();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortMusicBy = searchParams.get('sortMusicBy') || 'rating';

  function handleSortMusic(sortMusicBy) {
    searchParams.set('sortMusicBy', sortMusicBy);
    setSearchParams(searchParams);
  }

  const { userName } = useContext(userContext);

  return (
    <div className=' w-full h-full mt-5 grow'>
      <div
        className='w-full h-full overflow-x-auto rounded-md sm:rounded-lg border-2
                   border-blue-400 drop-shadow-md'
      >
        <Table style='secondary' columns={`0.09fr 0.9fr 0.2fr 0.4fr 0.3fr `}>
          <Table.Header>
            <th className='text-left sm:text-center'>#</th>
            <th className='flex items-center gap-3'>
              <span>Music {`( ${data?.length} )`}</span>
              <ModalB>
                <ModalB.Open opens='confirm'>
                  <button
                    className='hover:bg-emerald-500/20 text-[#77d4ff]
          !font-semibold px-2.5 py-0.5 rounded border border-[#77d4ff]'
                  >
                    Add +
                  </button>
                </ModalB.Open>
                <ModalB.Window name='confirm'>
                  <UploadMusicForm />
                </ModalB.Window>
              </ModalB>
            </th>
            <th
              onClick={() => handleSortMusic('rating')}
              className='!text-left flex items-center gap-2 cursor-pointer'
            >
              <span> Rating</span>
              <button
                className={
                  (sortMusicBy === 'rating' ? 'bg-emerald-500/30' : '') +
                  ' ' +
                  `hover:bg-emerald-500/20 text-[#77d4ff]
          !font-semibold px-0.5 py-0.5 rounded border border-[#77d4ff] `
                }
              >
                <CgArrowDown />
              </button>
            </th>
            <th
              onClick={() => handleSortMusic('myRate')}
              className='!text-left flex items-center gap-2 cursor-pointer pl-3 sm:pl-0'
            >
              <span> Rate </span>
              <button
                className={
                  (sortMusicBy === 'myRate' ? 'bg-emerald-500/30' : '') +
                  ' ' +
                  `hover:bg-emerald-500/20 text-[#77d4ff]
          !font-semibold px-0.5 py-0.5 rounded border border-[#77d4ff] `
                }
              >
                <CgArrowDown />
              </button>
            </th>
            <th></th>
          </Table.Header>

          <Table.Body
            isLoading={isLoading}
            data={data}
            render={(music, index) => (
              <MusicRowBody
                userName={userName}
                key={music.id}
                music={music}
                index={index}
              />
            )}
          />
        </Table>
      </div>
    </div>
  );
}

export default Music;
