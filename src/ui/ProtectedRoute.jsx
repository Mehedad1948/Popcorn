import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { createContext, useEffect } from 'react';
import Loading from './Loading';
import { toast } from 'react-hot-toast';

export const userContext = createContext();

let userName;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, user } = useUser();
 

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading) return <Loading />;

  if (isAuthenticated) {
    
  switch (user.email) {
    case 'mnourib13@gmail.com':
      userName = 'mehrdad';
      break;
    case 'alisamimiat74@gmail.com':
      userName = 'ali';
      break;
    case 'mnourib.13@gmail.com':
      userName = 'mehrdad';
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
  }
}

export default ProtectedRoute;
