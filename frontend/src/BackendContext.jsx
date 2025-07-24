import { createContext, useContext } from 'react';

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  const BACKEND_URL = ''
  return (
    <BackendContext.Provider value={BACKEND_URL}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => useContext(BackendContext);
