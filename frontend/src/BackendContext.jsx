import { createContext, useContext } from 'react';

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
  const backendUrl = 'https://pdf-utility-qldt.onrender.com'
  return (
    <BackendContext.Provider value={backendUrl}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => useContext(BackendContext);
