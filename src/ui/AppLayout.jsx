import { useContext, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { userContext } from './ProtectedRoute';
import Logo from './Logo';
import { useMovie } from '../hooks/useMovies';
import { appContext } from '../ContextPeovider';
import { BiSearchAlt, BiSolidTachometer } from 'react-icons/bi';
import { PiSignInDuotone } from 'react-icons/pi';
import MusicPlayer from './MusicPlayer';
import { BsMusicNote } from 'react-icons/bs';
import { MdMovieFilter, MdStarRate } from 'react-icons/md';

function AppLayout() {
  const { data } = useMovie();
  const { userName } = useContext(userContext);

  let unratedMovies;
  if (data) {
    unratedMovies = data.filter((movie) => movie[userName] === 0).length;
  }
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoProcess = (currentTime / duration) * 100;
  return (
    <>
      <div className='fixed -z-10 h-screen w-screen bg-gradient-to-tr from-blue-950 to-black'></div>
      <div className='sm:px-3 sm:pt-3 lg:pt-6 h-full lg:px-6  '>
        <NavBar
          videoProcess={videoProcess}
          unratedMovies={unratedMovies}
          userName={userName}
        />
        <div className='relative pb-16 sm:mb-4 grow'>
          <Outlet />
        </div>
        <MusicPlayer
          setDuration={setDuration}
          setCurrentTime={setCurrentTime}
        />
        {/* <AudioPlayer setDuration={setDuration} setCurrentTime={setCurrentTime} /> */}
        <Footer unratedMovies={unratedMovies} />
      </div>
    </>
  );
}

function NavBar({ videoProcess, unratedMovies, userName, musicsAmount }) {
  return (
    <nav
      className='nav-bar relative  overflow-hidden
                    bg-gradient-to-r from-purple-700 to-indigo-900 rounded-b-sm sm:rounded-lg'
    >
      <div
        className=' flex items-center justify-between py-2.5 sm:py-4 px-3 sm:px-6
                 '
      >
        <Logo />
        <div
          className='gap-5 sm:gap-6 lg:gap-10 hidden sm:flex lg:!text-lg items-center justify-center 
              font-semibold text-white'
        >
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/addMovie'>Add Movie</NavLink>
          <NavLink className='flex items-center' to='/rate'>
            <span>Rate Movie</span>
            {unratedMovies > 0 && (
              <span
                className='ml-1 aspect-square  rounded-full relative z-10
                           text-sm w-5 bg-orange-500 inline-block text-center'
              >
                {unratedMovies}
              </span>
            )}
          </NavLink>
          <NavLink to='/music'>Music</NavLink>

          <Link to='/login'>Login</Link>
        </div>

        <span className='capitalize'>{userName}</span>
      </div>
      <div
        className='absolute duration-300 bottom-0 h-1 rounded-r
        bg-gradient-to-r from-orange-400 to-orange-700'
        style={{ width: `${videoProcess}%` }}
      ></div>
    </nav>
  );
}

function Footer({ unratedMovies }) {
  const { showSearchbar, setShowSearchbar } = useContext(appContext);
  return (
    <div
      className='fixed bottom-0 border-t border-purple-700/70 left-0 w-full
         bg-purple-700/20 backdrop-blur-lg pt-2 pb-3 sm:hidden
    flex items-center justify-evenly gap-5 rounded-t-xl'
    >
      <NavLink to='/'>
        <BiSolidTachometer className='text-xl' />
      </NavLink>
      <NavLink to='/addMovie'>
        <MdMovieFilter className='text-xl' />
      </NavLink>
      <NavLink className='flex items-center' to='/rate'>
        <span>
          <MdStarRate className='text-xl' />
        </span>
        {unratedMovies > 0 && (
          <span
            className='ml-1 aspect-square  rounded-full relative z-10
                           text-xs w-4 bg-orange-500 inline-block text-center'
          >
            {unratedMovies}
          </span>
        )}
      </NavLink>
      <NavLink to='/music'>
        <BsMusicNote className='text-xl ' />
      </NavLink>
      <Link to='/login'>
        <PiSignInDuotone className='text-xl' />
      </Link>
      <button
        className={
          (showSearchbar ? 'bg-purple-700' : '') +
          ' ' +
          `px-1 rounded-full  aspect-square`
        }
        onClick={() => setShowSearchbar((s) => !s)}
      >
        <BiSearchAlt className='text-xl' />
      </button>
    </div>
  );
}

// function Search({ query, setQuery }) {
//   const inputEl = useRef(null);

//   useKey('Enter', function () {
//     if (document.activeElement === inputEl.current) return;
//     inputEl.current.focus();
//     setQuery('');
//   });

//   return (
//     <input
//       className='search'
//       type='text'
//       placeholder='Search movies...'
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       ref={inputEl}
//     />
//   );
// }

// function NumResults({ movies }) {
//   return (
//     <p className='num-results'>
//       Found <strong>{movies.length}</strong> results
//     </p>
//   );
// }

export default AppLayout;
