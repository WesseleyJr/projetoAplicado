import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/index.jsx";
import Button from "../../components/Button/index.jsx";
import InputForm from "../../components/InputForm/index.jsx";
import MenuAccessibility from "../../components/MenuAccessibility/index.jsx";
import Header from "../../components/Header/index.jsx";
import { Card, Container, Forms, Row, SectionForms } from "./styles.jsx";
import { RegexCpf } from "../../service/RegexMask.js";
import { GetPacienteCpf } from "../../service/recepcao.js";
import { toast } from "react-toastify";
import Toastify from "../../components/Toastify/index.jsx";
import { usePaciente } from "../../context/PacienteContext.jsx";
import { useAuth } from "../../context/UseContext.jsx";

export default function Recepcao() {
  const { nomeColaborador, registroColaborador, setRegistroColaborador, setNomeColaborador } = useAuth();
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const {setPaciente, setPacienteCadastrado} = usePaciente();

  const handleClick = async (event) => {
    event.preventDefault();

    const result = await GetPacienteCpf(cpf.replace(/\D/g, ""));

    if (result.sucess) {
      toast.success('Paciente cadastrado')
      setPaciente(result.data)
      setPacienteCadastrado(result.sucess)
      setTimeout(() => {
        navigate("/dados/paciente");
      }, 1000);
    } else {
      toast.error('Paciente nao cadastrado')
      setPacienteCadastrado(result.sucess)
      setTimeout(() => {
        navigate("/cadastro/paciente");
      }, 1000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeColaborador");
    localStorage.removeItem("registroColaborador");
    setNomeColaborador("");
    setRegistroColaborador("");
    navigate("/");
  };

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header name={nomeColaborador} matricula={registroColaborador} titleButton="Logout" handleFunction={handleLogout}/>
          <Banner title="Recepção" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title="CPF do Paciente"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o CPF"
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexCpf(e.target.value);
                    setCpf(mask);
                  }}
                  type={"text"}
                  propsValue={cpf}
                  propsMaxLength={14}
                />
              </Row>
              <Button title="Buscar" type="submit" />
            </Forms>
          </SectionForms>
        </Card>
        <Toastify/>
      </Container>
    </>
  );
}
