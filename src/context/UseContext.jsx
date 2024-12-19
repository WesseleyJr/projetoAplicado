import React, { createContext, useState, useContext, useEffect } from "react";

const UseContext = createContext();

export const UseProvider = ({ children }) => {
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [registroColaborador, setRegistroColaborador] = useState("");
  const [colaborador, setColaborador] = useState();
  const [idColaborador, setIdColaborador] = useState();

  useEffect(() => {
    const nome = localStorage.getItem("nomeColaborador");
    const registro = localStorage.getItem("registroColaborador");
    const id = localStorage.getItem("idColaborador");

    if (nome && registro) {
      setNomeColaborador(nome);
      setRegistroColaborador(registro);
      setIdColaborador(id)
    }
  }, []);

  useEffect(() => {
    if (nomeColaborador && registroColaborador) {
      localStorage.setItem("nomeColaborador", nomeColaborador);
      localStorage.setItem("registroColaborador", registroColaborador);
      localStorage.setItem("idColaborador", idColaborador);
    }
  }, [nomeColaborador, registroColaborador, idColaborador]);

  return (
    <UseContext.Provider
      value={{
        nomeColaborador,
        registroColaborador,
        setNomeColaborador,
        setRegistroColaborador,
        colaborador,
        setColaborador,
        idColaborador,
        setIdColaborador
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

export const useAuth = () => useContext(UseContext);
