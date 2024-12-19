import React, { createContext, useState, useContext } from "react";

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [paciente, setPaciente] = useState({});
  const [pacienteCadastrado, setPacienteCadastrado] = useState(false)
  const [idPaciente, setIdPaciente] = useState(0)



  return (
    <PacienteContext.Provider value={{ idPaciente, setIdPaciente, paciente, setPaciente, pacienteCadastrado, setPacienteCadastrado }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePaciente = () => useContext(PacienteContext);
