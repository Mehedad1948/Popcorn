import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { createContext, useEffect } from 'react';
import { useMovie } from '../hooks/useMovies';
import SpinnerMini from './SpinnerMini'

export const userContext = createContext();

let userName;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useMovie();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, user } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  // if (isLoading) return <Loading />;

  if (isAuthenticated) {
    switch (user.email) {
      case 'mnourib13@gmail.com':
        userName = 'mehrdad';
        break;
      case 'alisamimiat74@gmail.com':
        userName = 'ali';
        break;
      case 'mnourib.13@gmail.com':
        userName = 'mehdi';
        break;

      default:
        break;
    }

    // 4. If there IS a user, render the app
    return (
      <userContext.Provider value={{ userName }}>
        {children}
      </userContext.Provider>
    );
  } else {
    return <div className='flex w-screen h-screen gap-4 sm:gap-8 flex-col items-center justify-center'>
      <h1 className='sm:text-lg font-medium text-blue-100'>Authenticating...</h1>
      <SpinnerMini />
    </div>;
  }
}

export default ProtectedRoute;
