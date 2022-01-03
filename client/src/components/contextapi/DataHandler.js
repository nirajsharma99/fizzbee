import { createContext, useContext, useReducer } from 'react';

export const DataHandlerContext = createContext();
export const DataHandler = ({ initialState, reducer, children }) => (
  <DataHandlerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataHandlerContext.Provider>
);

export const useDataHandlerValue = () => useContext(DataHandlerContext);
