import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Header from "../../components/Header";
import { useAuth } from "../../context/UseContext";
import { RegexCpf } from "../../service/RegexMask.js";
import { useFila } from "../../context/FilaContext";
import { InserirPrescricao } from "../../service/prescricao";

export default function PrescricaoMedica() {
  const { nomeColaborador, registroColaborador } = useAuth();
  const navigate = useNavigate();

  const { consulta } = useFila();

  const [nomePaciente, setNomePaciente] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeMedico, setNomeMedico] = useState("");
  const [crm, setCrm] = useState("");
  const [medicamentos, setMedicamentos] = useState([
    { nome: "", dosagem: "", frequencia: "", duracao: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [medicamentoT, setMedicamento] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [duracao, setDuracao] = useState("");

  const handleAddMedicamento = () => {
    setMedicamentos([
      ...medicamentos,
      { nome: "", dosagem: "", frequencia: "", duracao: "" },
    ]);
  };

  const handleMedicamentoChange = (index, field, value) => {
    const newMedicamentos = medicamentos.map((medicamento, i) => {
      if (i === index) {
        return { ...medicamento, [field]: value };
      }
      return medicamento;
    });
    setMedicamentos(newMedicamentos);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prescricao = {
      id_consulta: consulta.id,
      dosagem: dosagem,
      frequencia: frequencia,
      medicamento: medicamentoT,
      duracao: duracao,
    };

    const result = await InserirPrescricao(prescricao);
    if (result.sucess) {
      toast.success("Prescrição cadastrada!", {});

      setTimeout(() => {
        navigate("/consulta");
      }, 1500);
    } else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        setIsLoading(false);
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro desconhecido, tente novamente.");
      }
    }
  };

  useEffect(() => {
    setNomeMedico(nomeColaborador);
    setCrm(registroColaborador);
    setNomePaciente(consulta.fila.paciente.nomeCompleto);
    setCpf(consulta.fila.paciente.cpf);
  }, []);

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            handleFunction={() => {
              navigate("/consulta");
            }}
          />
          <Banner title="Prescrição Médica" />
          <SectionForms>
            <Forms onSubmit={handleSubmit}>
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
                  title="CPF"
                  propsPlaceHolder={"Digite o cpf"}
                  propsValue={cpf}
                  handleFunction={(e) => {
                    const mask = RegexCpf(e.target.value);
                    setCpf(mask);
                  }}
                  propsRequired={true}
                  propsWidth="30%"
                  disabled={true}
                />
              </Row>
              <Row>
                <InputForm
                  title="Nome completo do médico"
                  propsWidth="70%"
                  propsPlaceHolder="Digite o nome do médico"
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
              {medicamentos.map((medicamento, index) => (
                <Row key={index}>
                  <InputForm
                    title="Nome do medicamento"
                    propsWidth="40%"
                    propsPlaceHolder="Digite o nome"
                    propsRequired={true}
                    // handleFunction={(e) => handleMedicamentoChange(index, "nome", e.target.value)}
                    handleFunction={(e) => {
                      setMedicamento(e.target.value);
                    }}
                    // propsValue={medicamento.nome}
                    propsValue={medicamentoT}
                  />
                  <InputForm
                    title="Dosagem"
                    propsWidth="20%"
                    propsPlaceHolder="Digite a dosagem"
                    propsRequired={true}
                    // handleFunction={(e) => handleMedicamentoChange(index, "dosagem", e.target.value)}
                    handleFunction={(e) => {
                      setDosagem(e.target.value);
                    }}
                    // propsValue={medicamento.dosagem}
                    propsValue={dosagem}
                  />
                  <InputForm
                    title="Frequência"
                    propsWidth="20%"
                    propsPlaceHolder="Digite a frequência"
                    propsRequired={true}
                    // handleFunction={(e) => handleMedicamentoChange(index, "frequencia", e.target.value)}
                    handleFunction={(e) => {
                      setFrequencia(e.target.value);
                    }}
                    // propsValue={medicamento.frequencia}
                    propsValue={frequencia}
                  />
                  <InputForm
                    title="Duração"
                    propsWidth="20%"
                    propsPlaceHolder="Digite a duração"
                    propsRequired={true}
                    // handleFunction={(e) => handleMedicamentoChange(index, "duracao", e.target.value)}
                    handleFunction={(e) => {
                      setDuracao(e.target.value);
                    }}
                    // propsValue={medicamento.duracao}
                    propsValue={duracao}
                  />
                </Row>
              ))}
              {/* <CenteredButton>
                <Button
                  title="Adicionar Medicamento"
                  type="button"
                  onClick={handleAddMedicamento}
                />
              </CenteredButton> */}
              <CenteredButton>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Button title="Finalizar Prescrição" type="submit" />
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
