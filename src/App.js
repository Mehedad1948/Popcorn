import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import AddMovie from './ui/AddMovie';
import Login from './Login';
import RateMovie from './ui/RateMovie';
import ProtectedRoute from './ui/ProtectedRoute';
import ContextPeovider from './ContextPeovider';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'addMovie',
        element: <AddMovie />,
      },
      {
        path: 'rate',
        element: <RateMovie />,
      },
    ],
  },
  {
    element: <Login />,
    path: '/login',
  },
]);

export default function App() {
  return (
    <>
      <ContextPeovider>
        <RouterProvider router={router} />
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
          toastOptions={{
            className: 'bg-indigo-700 text-white',
            style: {
              fontSize: '16px',
              border: '1px solid #6741d9',
              padding: '16px',
              color: '#eee',
              backgroundColor: '#444',
            },
            // Define default options

            // Default options for specific types
            success: {
              duration: 3000,
              className: 'bg-indigo-700 text-white font-semibold tracing-6',
            },
            error: {
              duration: 5000,
              className: 'bg-rose-100',
            },
          }}
        />
      </ContextPeovider>
    </>
  );
}
