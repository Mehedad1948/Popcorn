import { useContext, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { userContext } from './ProtectedRoute';

function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className='w-full my-4 mb-11 sm:mb-4'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function NavBar({ children }) {
  const { userName } = useContext(userContext);
  return (
    <nav
      className='nav-bar flex items-center justify-between py-1.5 sm:py-4 px-3 sm:px-6 
                    bg-gradient-to-r from-purple-700 to-indigo-900 rounded sm:rounded-lg'
    >
      <Logo />
      <div className='gap-5 sm:gap-10 hidden sm:flex sm:!text-lg items-center justify-center 
              font-semibold text-white'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/addMovie'>Add Movie</NavLink>
        <NavLink to='/rate'>Rate Movie</NavLink>
      </div>
      <span className='capitalize'>{userName}</span>
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
      <h1 className='sm:text-2xl text-lg font-semibold text-white'>Paradiso</h1>
    </div>
  );
}

function Footer(params) {
  return (
    <div
      className='fixed bottom-0 left-0 w-full bg-purple-700/20 backdrop-blur-lg py-3 sm:hidden
                    flex items-center justify-center gap-5 rounded-t-xl'
    >
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/addMovie'>Add Movie</NavLink>
      <NavLink to='/rate'>Rate Movie</NavLink>
      <Link to='/login'>Login</Link>
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
