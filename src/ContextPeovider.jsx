import { createContext } from 'react';

const appContext = createContext();

function ContextPeovider({ children }) {
  return <div>{children}</div>;
}

export default ContextPeovider;
