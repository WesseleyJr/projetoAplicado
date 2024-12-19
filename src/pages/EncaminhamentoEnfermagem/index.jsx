import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button/index.jsx";
import MenuAccessibility from "../../components/MenuAccessibility";
import {
  Card,
  Container,
  Forms,
  Row,
  SectionForms,
  CenteredButton,
} from "./styles";
import { EnviarArquivo, GetEncaminhamento } from "../../service/encaminhamento";
import { useFila } from "../../context/FilaContext";
import { useAuth } from "../../context/UseContext";
import Header from "../../components/Header";
import AreaForm from "../../components/AreaForm";
import { PutFila } from "../../service/Fila.js";
import Toastify from "../../components/Toastify/index.jsx";
import { toast } from "react-toastify";

export default function EncaminhamentoEnfermagem() {
  const navigate = useNavigate();
  const { itemFila } = useFila();
  const { nomeColaborador, registroColaborador, idColaborador } = useAuth();
  const [nomeMedico, setNomeMedico] = useState("");
  const [crm, setCrm] = useState("");
  const [tipoExame, setTipoExame] = useState("");
  const [dataHoraSolicitacao, setDataHoraSolicitacao] = useState("");
  const [instrucao, setInstrucao] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [cpf, setCpf] = useState("");
  const [file, setFile] = useState(null);
  const [idEncaminhamento, setIdEncaminhamento] = useState(null);


  useEffect(() => {
    const handlefunction = async () => {
      const id = itemFila.id;
      console.log(id);

      const result = await GetEncaminhamento(id);
      if (result.success) {
        setNomeMedico(result.data.consulta.colaborador.nome);
        setCrm(result.data.consulta.colaborador.registro);
        setNomePaciente(result.data.consulta.fila.paciente.nomeCompleto);
        setCpf(result.data.consulta.fila.paciente.cpf);
        setDataHoraSolicitacao(result.data.dataEncaminhamento);
        setTipoExame(result.data.tipoExame);
        setInstrucao(result.data.instrucoes);
        setIdEncaminhamento(result.data.id);
      }
    };
    handlefunction();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    const resultFile = await EnviarArquivo(file, idEncaminhamento);
    if (resultFile.success) {
      toast.success("Exame cadastrado com sucesso");

      const fila = {
        id_paciente: itemFila.paciente.id,
        prioridade: itemFila.prioridade,
        setor: itemFila.setor,
        status: "Liberado",
        especialidade: itemFila.especialidade,
        horario: itemFila.horario,
      };

      const result = await PutFila(fila, itemFila.id);
      if (result.sucess) {
        toast.success("Paciente liberado");
        navigate("/fila/enfermagem");
      } else {
            if (result.data && result.data.erros && result.data.erros.length > 0) {
              toast.error(result.data.erros[0]);
            } else {
              toast.error("Erro ao liberar paciente.");
            }
          }
    } else {
          if (result.data && result.data.erros && result.data.erros.length > 0) {
            toast.error(result.data.erros[0]);
          } else {
            toast.error("Erro ao cadastrar exame.");
          }
        }
  };

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
              navigate("/fila/enfermagem");
            }}
          />
          <Banner title="Encaminhamento Enfermagem" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title="Nome completo do médico"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o nome"
                  propsValue={nomeMedico}
                  disabled={true}
                />
                <InputForm
                  title="CRM"
                  propsWidth="30%"
                  propsPlaceHolder="Digite o CRM"
                  propsValue={crm}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Tipo de Exame"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o tipo de exame"
                  propsValue={tipoExame}
                  disabled={true}
                />
                <InputForm
                  title="Data/Hora"
                  propsWidth={"30%"}
                  propsPlaceHolder="Digite a data e hora"
                  propsValue={dataHoraSolicitacao}
                  disabled={true}
                />
              </Row>
              <Row>
                <AreaForm
                  title="Instruções"
                  propsWidth={"100%"}
                  propsHeigth={"150px"}
                  propsValue={instrucao}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Nome completo do paciente"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o nome do paciente"
                  propsValue={nomePaciente}
                  disabled={true}
                />
                <InputForm
                  title="CPF"
                  propsWidth="30%"
                  propsPlaceHolder="Digite o CPF"
                  propsValue={cpf}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Anexar Exame"
                  propsPlaceHolder="Anexar exame"
                  type="file"
                  propsFile=".pdf"
                  handleFunction={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    console.log(selectedFile);
                  }}
                />
                <Button title="Encerrar" type={"submit"} />
              </Row>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify/>
      </Container>
    </>
  );
}
