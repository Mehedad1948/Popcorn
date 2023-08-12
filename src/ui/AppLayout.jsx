import { useRef } from 'react';
import {  NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className='w-full mt-4'>
      <Outlet />
      
      </div>
    </div>
  );
}

function NavBar({ children }) {
  return (
    <nav className='nav-bar flex items-center justify-between py-4 px-3 sm:px-6 rounded-lg'>
      <Logo />
      <div className='flex gap-5 sm:gap-10 sm:text-lg items-center justify-center font-semibold text-white'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/addMovie'>Add Movie</NavLink>
        <NavLink to='/rate'>Rate Movie</NavLink>
      </div>
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span className='text-2xl' role='img'>
        🍿
      </span>
      <h1 className='text-2xl sm:block hidden font-semibold text-white'>usePopcorn</h1>
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
