import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './global.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={2} />

    <Test /> */}
  </React.StrictMode>
);