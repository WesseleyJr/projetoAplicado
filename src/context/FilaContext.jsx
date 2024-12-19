import React, { createContext, useState, useContext } from 'react';

const FilaContext = createContext();

export const FilaProvider = ({ children }) => {
  const [itemFila, setItemFila] = useState({})
  const [consulta, setConsulta] = useState({})
  const [isEncaminhamento, setIsEncaminhamento] = useState(false)


  return (
    <FilaContext.Provider value={{isEncaminhamento, setIsEncaminhamento, itemFila, setItemFila, consulta, setConsulta}}>
      {children}
    </FilaContext.Provider>
  );
};

export const useFila = () => useContext(FilaContext);