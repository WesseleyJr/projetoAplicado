import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import { Card, Container, Forms, Row, SectionForms, CenteredButton, Spinner } from "./styles";
import DateTimeInput from "../../components/DatePicker";
import CPFInput from "../../components/cpfInput";
import AreaForm from "../../components/AreaForm";
import { RegexCpf } from "../../service/RegexMask.js";
import Toastify from "../../components/Toastify";
import Header from "../../components/Header";
import { useAuth } from "../../context/UseContext";
import { useFila } from "../../context/FilaContext";
import { InserirEncaminhamento } from "../../service/encaminhamento";


export default function EncaminhamentoMedico() {
  const navigate = useNavigate();
  const {nomeColaborador, registroColaborador} = useAuth();
  const {consulta, isEncaminhamento, setIsEncaminhamento} = useFila();

  const [nomeMedico, setNomeMedico] = useState("");
  const [crm, setCrm] = useState("");
  const [tipoExame, setTipoExame] = useState("");
  const [dataHoraSolicitacao, setDataHoraSolicitacao] = useState('');
  const [instrucao, setInstrucao] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const encaminhamento = {
      dataEncaminhamento: dataHoraSolicitacao,
      instrucoes: instrucao,
      tipoExame: tipoExame,
      id_consulta: consulta.id
    };

    setIsLoading(true); 
    
    CadastrarEncaminhamentoNaApi(encaminhamento);
  };

  async function CadastrarEncaminhamentoNaApi(encaminhamento) {

      const result = await InserirEncaminhamento(encaminhamento);

      if(result.sucess){
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Encaminhamento realizado com sucesso!", {
          position: "top-center",
        });
        setIsEncaminhamento(true)

        setTimeout(() => {
          navigate("/consulta");
        }, 1500);
      }, 2000);
  
    }else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        setIsLoading(false);
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro desconhecido, tente novamente.");
      }
    }
  }


  useEffect(()=>{
    setNomeMedico(nomeColaborador)
    setCrm(registroColaborador)
    setNomePaciente(consulta.fila.paciente.nomeCompleto)
    setCpf(consulta.fila.paciente.cpf)
    setDataHoraSolicitacao(consulta.dataDaConsulta)
  },[])

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
          name={nomeColaborador}
          matricula={registroColaborador}
          handleFunction={()=>{navigate('/consulta')}}
          />
          <Banner title="Encaminhamento Médico" />
          <SectionForms>
            <Forms onSubmit={handleSubmit}>
              <Row>
                <InputForm
                  title="Nome completo do médico"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o nome"
                  propsRequired={true}
                  handleFunction={(e) => setNomeMedico(e.target.value)}
                  propsValue={nomeMedico}
                  disabled={true}
                />
                <InputForm
                  title="CRM"
                  propsWidth="30%"
                  propsPlaceHolder="Digite o CRM"
                  propsRequired={true}
                  handleFunction={(e) => setCrm(e.target.value)}
                  propsValue={crm}
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Tipo de Exame"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o tipo de exame"
                  propsRequired={true}
                  handleFunction={(e) => setTipoExame(e.target.value)}
                  propsValue={tipoExame}
                />
                <InputForm
                  title="Data"
                  propsWidth="30%"
                  handleFunction={(e) => setDataHoraSolicitacao(e.target.value)}
                  propsRequired={true}
                  propsValue={dataHoraSolicitacao}
                  disabled={true}
                />
              </Row>
              <Row>
                <AreaForm
                  title="Instruções"
                  propsWidth={"100%"}
                  propsHeigth={"150px"}
                  propsRequired={true}
                  handleFunction={(e) => setInstrucao(e.target.value)}
                  propsValue={instrucao}
                />
              </Row>
              <Row>
                <InputForm
                  title="Nome completo do paciente"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o nome do paciente"
                  propsRequired={true}
                  handleFunction={(e) => setNomePaciente(e.target.value)}
                  propsValue={nomePaciente}
                  disabled={true}
                />
            <InputForm
              disabled={true}
              title="CPF"
              placeholder="Digite seu CPF"
              propsValue={cpf}
              handleFunction={(e) => {
              const mask = RegexCpf(e.target.value);
              setCpf(mask);
               }}
              propsRequired={true}
              propsWidth="30%"
              />
              </Row>
              <CenteredButton>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Button title="Finalizar encaminhamento" type="submit" />
                )}
              </CenteredButton>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
      {/* <ToastContainer /> */}
    </>
  );
}
