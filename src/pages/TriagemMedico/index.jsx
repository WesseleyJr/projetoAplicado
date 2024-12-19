import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import { Card, Container, Forms, Row, SectionForms } from "./styles";
import Header from "../../components/Header";
import { useAuth } from "../../context/UseContext";
import { useFila } from "../../context/FilaContext";
import { GetTriagem } from "../../service/consulta";
import Toastify from "../../components/Toastify";
import { toast } from "react-toastify";

export default function TriagemMedico() {
  const navigate = useNavigate();
  const { nomeColaborador, registroColaborador } = useAuth();
  const { itemFila } = useFila();

  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [batimentoCardiaco, setBatimentoCardiaco] = useState("");
  const [pressaoArterial, setPressaoArterial] = useState("");
  const [temperaturaCorporal, setTemperaturaCorporal] = useState("");
  const [alergia, setAlergia] = useState("");
  const [doencaExistente, setDoencaExistente] = useState("");
  const [sintomas, setSintomas] = useState("");

  useEffect(() => {
    const buscar = async () => {
      const result = await GetTriagem(itemFila.id);
      if (result.sucess) {
        setNome(result.data.fila.paciente.nomeCompleto);
        setGenero(result.data.fila.paciente.genero);
        setPrioridade(result.data.fila.prioridade);
        setBatimentoCardiaco(result.data.batimentoCardiaco);
        setPressaoArterial(result.data.pressaoArterial);
        setTemperaturaCorporal(result.data.temperaturaCorporal);
        setAlergia(result.data.alergia);
        setDoencaExistente(result.data.doencaExistente);
        setSintomas(result.data.sintomas);
      } else {
        if (result.data && result.data.erros && result.data.erros.length > 0) {
          toast.error(result.data.erros[0]);
        } else {
          toast.error("Erro desconhecido, tente novamente.");
        }
      }
    };

    buscar();
  }, []);

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            titleButton={"Voltar"}
            matricula={registroColaborador}
            handleFunction={() => {
              navigate("/consulta");
            }}
          />
          <Banner title="Nome Completo" />
          <SectionForms>
            <Forms>
              <Row>
                <InputForm
                  title="Nome Completo"
                  propsWidth="50%"
                  propsPlaceHolder="Digite o nome completo"
                  propsValue={nome}
                  disabled={true}
                />
                <InputForm
                  title="Gênero"
                  propsWidth="25%"
                  propsPlaceHolder="Digite o gênero"
                  propsValue={genero}
                  disabled={true}
                />
                <InputForm
                  title="Prioridade"
                  propsWidth="25%"
                  propsPlaceHolder="Digite a prioridade"
                  propsValue={prioridade}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Batimento Cardíaco"
                  propsWidth={"33%"}
                  propsPlaceHolder="Ex: 80 bpm"
                  propsValue={batimentoCardiaco}
                  disabled={true}
                />
                <InputForm
                  title="Pressão Arterial"
                  propsWidth={"33%"}
                  propsPlaceHolder="Ex: 12/8"
                  propsValue={pressaoArterial}
                  disabled={true}
                />
                <InputForm
                  title="Temperatura Corporal"
                  propsWidth="70%"
                  propsPlaceHolder="Ex: 36.5°C"
                  propsValue={temperaturaCorporal}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Alergia"
                  propsWidth="100%"
                  propsPlaceHolder="Digite as alergias (se houver)"
                  propsValue={alergia}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Doenças Pré-Existentes"
                  propsWidth="100%"
                  propsPlaceHolder="Ex: diabetes, hipertensão"
                  propsValue={doencaExistente}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Sintomas"
                  propsWidth="100%"
                  propsPlaceHolder="Descreva os sintomas do paciente"
                  propsValue={sintomas}
                  disabled={true}
                />
              </Row>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
