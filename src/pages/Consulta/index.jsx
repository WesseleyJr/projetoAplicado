import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import MenuAccessibility from "../../components/MenuAccessibility";
import Header from "../../components/Header";
import { Card, Container, Forms, Row, RowBottom, SectionForms } from "./styles";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import AreaForm from "../../components/AreaForm";
import { useFila } from "../../context/FilaContext";
import { useAuth } from "../../context/UseContext";
import {
  AtualizarConsulta,
  GetTriagem,
  InserirConsulta,
} from "../../service/consulta";
import { useNavigate } from "react-router-dom";
import { RegexCpf } from "../../service/RegexMask.js";
import { toast } from "react-toastify";
import SpeechRecognition from "../../components/Speech/speech.jsx";
import { PutFila } from "../../service/Fila.js";
import Toastify from "../../components/Toastify/index.jsx";

export default function Consulta() {
  const { nomeColaborador, registroColaborador, idColaborador } = useAuth();
  const navigate = useNavigate();

  const { consulta, isEncaminhamento, setIsEncaminhamento } = useFila();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeMedico, setNomeMedico] = useState("");
  const [registro, setRegistro] = useState("");
  const [data, setData] = useState("");
  const [diagnostico, setDiagnostico] = useState(() => {
    return localStorage.getItem("diagnostico") || "";
  });
  const [alergia, setAlergia] = useState("");

  useEffect(() => {
    setNome(consulta.fila.paciente.nomeCompleto);
    setCpf(consulta.fila.paciente.cpf);
    setNomeMedico(consulta.colaborador.nome);
    setRegistro(consulta.colaborador.registro);
    setData(consulta.dataDaConsulta);
    getAlergia();
  }, []);

  const getAlergia = async () => {
    const result = await GetTriagem(consulta.fila.id);

    if (result.sucess) {
      if (result.data.alergia) {
        setAlergia(result.data.alergia);
        return;
      } else {
        setAlergia("Paciente sem alergias");
        return;
      }
    } else {
      toast.error("Erro ao buscar triagem");
      return;
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const consultaJson = {
      id_colaborador: consulta.colaborador.id,
      id_fila: consulta.fila.id,
      diagnostico: diagnostico,
      dataDaConsulta: consulta.dataDaConsulta,
    };

    const result = await AtualizarConsulta(consultaJson, consulta.id);
    if (result.sucess) {
      toast.success("Consulta cadastrada");
    } else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro ao cadastrar consulta.");
      }
    }

    if (isEncaminhamento) {
      const filaPaciente = {
        id_paciente: consulta.fila.paciente.id,
        prioridade: consulta.fila.prioridade,
        setor: "Exame",
        status: "Aguardando",
        especialidade: consulta.fila.especialidade,
        horario: consulta.fila.horario,
      };

      const result = await PutFila(filaPaciente, consulta.fila.id);
      if (result.sucess) {
        toast.success("Paciente encaminhado para o exame");
      } else {
        if (result.data && result.data.erros && result.data.erros.length > 0) {
          toast.error(result.data.erros[0]);
        } else {
          toast.error("Erro ao encaminhar para exame.");
        }
      }
    } else {
      const filaPaciente = {
        id_paciente: consulta.fila.paciente.id,
        prioridade: consulta.fila.prioridade,
        setor: "Liberado",
        status: "Aguardando",
        especialidade: consulta.fila.especialidade,
        horario: consulta.fila.horario,
      };

      const result = await PutFila(filaPaciente, consulta.fila.id);
      if (result.sucess) {
        toast.success("Paciente liberado");
      } else {
        if (result.data && result.data.erros && result.data.erros.length > 0) {
          toast.error(result.data.erros[0]);
        } else {
          toast.error("Erro ao encaminhar liberar.");
        }
      }
    }

    setTimeout(() => {
      localStorage.removeItem('diagnostico');
      setIsEncaminhamento(false)
      navigate("/fila/medico");
    }, 3000);
  };

  const handleTranscript = (transcript) => {
    setDiagnostico((prevDiagnostico) => prevDiagnostico + " " + transcript);
  };

  const handleClear = () => {
    setDiagnostico("");
  };


  useEffect(() => {
    localStorage.setItem("diagnostico", diagnostico);
  }, [diagnostico]);

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            titleButton="Voltar"
            handleFunction={() => {
              setTimeout(() => {
                navigate("/fila/medico");
              }, 1000);
            }}
          />
          <Banner title="Consulta Médica" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title={"Nome completo paciente"}
                  propsWidth={"70%"}
                  propsPlaceHolder={"Digite o nome"}
                  propsRequired={true}
                  handleFunction={(e) => setNome(e.target.value)}
                  propsValue={nome}
                  disabled={true}
                />
                <InputForm
                  title={"CPF paciente"}
                  propsWidth={"30%"}
                  propsPlaceHolder={"Digite o CPF"}
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexCpf(e.target.value);
                    setCpf(mask);
                  }}
                  propsValue={cpf}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Alergia"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Digite as alergias"}
                  propsRequired={false}
                  handleFunction={(e) => setAlergia(e.target.value)}
                  propsValue={alergia}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Data da consulta"}
                  propsWidth={"30%"}
                  propsPlaceHolder={"Digite a data"}
                  propsRequired={true}
                  handleFunction={(e) => setData(e.target.value)}
                  propsValue={data}
                  disabled={true}
                />
                <Button
                  title={"Prontuario Geral"}
                  handleFunction={() => {
                    navigate("/prontuario");
                  }}
                  type={"button"}
                />
                <Button
                  type={"button"}
                  title={"Laudo Triagem"}
                  handleFunction={() => {
                    navigate("/triagem/medico");
                  }}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Nome completo médico"}
                  propsWidth={"70%"}
                  propsPlaceHolder={"Digite o nome"}
                  propsRequired={true}
                  handleFunction={(e) => setNomeMedico(e.target.value)}
                  propsValue={nomeMedico}
                  disabled={true}
                />
                <InputForm
                  title={"CRM"}
                  propsWidth={"30%"}
                  propsPlaceHolder={"Digite o CRM"}
                  propsRequired={true}
                  handleFunction={(e) => setRegistro(e.target.value)}
                  propsValue={registro}
                  disabled={true}
                />
              </Row>
              <Row>
                <AreaForm
                  title={"Diagnóstico"}
                  propsWidth={"100%"}
                  propsRequired={true}
                  propsHeigth={"200px"}
                  handleFunction={(e) => setDiagnostico(e.target.value)}
                  propsValue={diagnostico}
                />
              </Row>
              <SpeechRecognition
                onTranscript={handleTranscript}
                onClear={handleClear}
              />
              <RowBottom>
                <Button
                  type={"button"}
                  title={"Prescrição Médica"}
                  handleFunction={() => {
                    navigate("/prescricao/medica");
                  }}
                />
                <Button
                  type={"button"}
                  title={"Encaminhamento"}
                  handleFunction={() => {
                    navigate("/encaminhamento/medico");
                  }}
                />
              </RowBottom>
              <Button title={"Encerrar"} type={"submit"} />
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
