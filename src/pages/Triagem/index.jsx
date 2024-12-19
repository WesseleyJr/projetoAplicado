import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import {
  Card,
  Container,
  Forms,
  Row,
  SectionForms,
  CenteredButton,
  Spinner,
} from "./styles";
import Toastify from "../../components/Toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FichaTriagem, PutFila } from "../../service/triagem";
import Dropbox from "../../components/DropBox";
import { useFila } from "../../context/FilaContext";
import { useAuth } from "../../context/UseContext";
import Header from "../../components/Header";
import { RegexPrecao } from "../../service/RegexMask";

export default function Triagem() {
  const { nomeColaborador, registroColaborador } = useAuth();
  const { itemFila } = useFila();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [batimentoCardiaco, setBatimentoCardiaco] = useState("");
  const [pressaoArterial, setPressaoArterial] = useState("");
  const [temperaturaCorporal, setTemperaturaCorporal] = useState("");
  const [alergia, setAlergia] = useState("");
  const [doencaExistente, setDoencaExistente] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [idColaborador, setIdColaborador] = useState(0);
  const [idFila, setIdFila] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();

    const laudo = {
      nome: nome,
      genero: genero,
      prioridade: prioridade,
      batimentoCardiaco: batimentoCardiaco,
      pressaoArterial: pressaoArterial,
      temperaturaCorporal: temperaturaCorporal,
      alergia: alergia,
      doencaExistente: doencaExistente,
      sintomas: sintomas,
      idColaborador: idColaborador,
      idFila: idFila,
    };

    cadastrarLaudo(laudo);
  };

  useEffect(() => {
    setIdColaborador(1);
    setNome(itemFila.paciente.nomeCompleto);
    setGenero(itemFila.paciente.genero);
    setIdFila(itemFila.id);
  }, []);

  async function cadastrarLaudo(laudo) {
    setIsLoading(true);

    try {
      const response = await FichaTriagem(laudo);

      const filaPaciente = {
        id_paciente: itemFila.paciente.id,
        prioridade: prioridade,
        setor: "Médico",
        status: "Aguardando",
        especialidade: especialidade,
        horario: itemFila.horario,
      };

      const result = await PutFila(filaPaciente, itemFila.id);

      if (result.sucess) {
        toast.success("Laudo realizado com sucesso!");

        navigate("/fila/triagem");
      } else {
                if (result.data && result.data.erros && result.data.erros.length > 0) {
                  toast.error(result.data.erros[0]);
                } else {
                  toast.error("Erro desconhecido, tente novamente.");
                }
              }
    } catch (error) {
      toast.error(`Erro: ${error.message}`, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            handleFunction={() => {
              navigate("/fila/triagem");
            }}
          />
          <Banner title="Laudo Triagem" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title="Nome completo"
                  propsWidth="60%"
                  propsPlaceHolder="Digite o nome completo"
                  propsRequired={true}
                  handleFunction={(e) => setNome(e.target.value)}
                  propsValue={nome}
                  disabled={true}
                />
                <InputForm
                  title="Gênero"
                  propsWidth="30%"
                  propsPlaceHolder="Digite o gênero"
                  propsRequired={true}
                  handleFunction={(e) => setGenero(e.target.value)}
                  propsValue={genero}
                  disabled={true}
                />
                <Dropbox
                  title={"Prioridade"}
                  initialValue="Prioridade"
                  propsWidth="30%"
                  onSelect={(value) => setPrioridade(value)}
                  option1={"EMERGÊNCIA"}
                  option2={"MUITO_URGENTE"}
                  option3={"URGENTE"}
                  option4={"POUCO_URGENTE"}
                  option5={"NÃO_URGENTE"}
                />
              </Row>

              <Row>
                <InputForm
                  title="Batimento Cardíaco"
                  propsWidth="30%"
                  propsPlaceHolder="Ex: 80 bpm"
                  propsRequired={true}
                  handleFunction={(e) => setBatimentoCardiaco(e.target.value)}
                  type={"number"}
                />
                <InputForm
                  title="Pressão Arterial"
                  propsWidth="30%"
                  propsPlaceHolder="Ex: 120/80"
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexPrecao(e.target.value);
                    setPressaoArterial(mask);
                  }}
                  propsValue={pressaoArterial}
                />
                <InputForm
                  title="Temperatura Corporal"
                  propsWidth="30%"
                  propsPlaceHolder="Ex: 36.5°C"
                  propsRequired={true}
                  handleFunction={(e) => setTemperaturaCorporal(e.target.value)}
                  type={"number"}
                />
              </Row>

              <Row>
                <InputForm
                  title="Alergia"
                  propsWidth="70%"
                  propsPlaceHolder="Digite as alergias (se houver)"
                  propsRequired={false}
                  handleFunction={(e) => setAlergia(e.target.value)}
                />

                <Dropbox
                  title={"Especialidade"}
                  initialValue="Especialidade"
                  propsWidth="30%"
                  onSelect={(value) => setEspecialidade(value)}
                  option1={"Oncologia_Clínica"}
                  option2={"Oncologia_Pediátrica"}
                  option3={"Oncologia_Mamária"}
                  option4={"Oncologia_Urológica"}
                  option5={"Outros"}
                />
              </Row>
                
  

              <Row>
                <InputForm
                  title="Doenças Pré-Existentes"
                  propsWidth="100%"
                  propsPlaceHolder="Ex: diabetes, hipertensão"
                  propsRequired={false}
                  handleFunction={(e) => setDoencaExistente(e.target.value)}
                />
              </Row>

              <Row>
                <InputForm
                  title="Sintomas"
                  propsWidth="100%"
                  propsPlaceHolder="Descreva os sintomas do paciente"
                  propsRequired={true}
                  handleFunction={(e) => setSintomas(e.target.value)}
                />
              </Row>

              <CenteredButton>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Button title="Encerrar" type="submit" />
                )}
              </CenteredButton>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
