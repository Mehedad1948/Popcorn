import { createContext, useState } from 'react';

export const appContext = createContext();

function ContextPeovider({ children }) {
  const [showSearchbar, setShowSearchbar] = useState(false);

  return <appContext.Provider value={{showSearchbar, setShowSearchbar}}>{children}</appContext.Provider>;
}

export default ContextPeovider;
