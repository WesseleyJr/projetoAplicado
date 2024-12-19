import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import { PostEncaminhar, PutPaciente } from "../../service/recepcao";
import {
  RegexCep,
  RegexCpf,
  RegexData,
  RegexTelefone,
} from "../../service/RegexMask.js";
import {
  Card,
  Container,
  Forms,
  Row,
  RowCheckbox,
  SectionForms,
} from "./styles";
import Toastify from "../../components/Toastify";
import { consultaCep } from "../../service/viaCep";
import { usePaciente } from "../../context/PacienteContext";
import Dropbox from "../../components/DropBox";
import { useAuth } from "../../context/UseContext";

export default function DadosPaciente() {
  const { paciente, pacienteCadastrado, idPaciente } = usePaciente();
  const { nomeColaborador, registroColaborador } = useAuth();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [id, setId] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    const paciente = {
      nomeCompleto: nome,
      cpf: cpf.replace(/\D/g, ""),
      telefone: telefone.replace(/\D/g, ""),
      dataDeNascimento: dataNascimento,
      genero: genero,
      cep: cep.replace(/\D/g, ""),
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    };

    const result = PutPaciente(paciente, id);

    if (result) {
      toast.success("Atualizado com sucesso");
    } else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro ao atualizar.");
      }
    }
  };

  const handleBlurCep = async (cep) => {
    const cepJson = await consultaCep(cep);
    if (cepJson) {
      toast.success("Sucesso ao buscar CEP");
      setRua(cepJson.logradouro);
      setCidade(cepJson.localidade);
      setBairro(cepJson.bairro);
      setEstado(cepJson.estado);
    } else {
      toast.error("CEP invalido");
    }
  };

  const handleTriagem = async (event) => {
    event.preventDefault();

    const data = new Date();
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    const segundos = data.getSeconds().toString().padStart(2, "0");

    const hora = `${horas}:${minutos}:${segundos}`;

    const fila = {
      id_paciente: id,
      prioridade: "NULL",
      setor: "Triagem",
      status: "Aguardando",
      especialidade: "Outros",
      horario: hora,
    };

    console.log(fila);

    const result = await PostEncaminhar(fila);

    if (result.sucess) {
      toast.success("Atualizado com sucesso");
      setTimeout(() => {
        toast.error("foi");
        navigate("/recepcao");
      }, 1000);
    } else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro ao encaminhar.");
      }
    }
  };

  useEffect(() => {
    setNome(paciente.nomeCompleto);
    setCpf(paciente.cpf);
    setTelefone(paciente.telefone);
    setGenero(paciente.genero);
    setDataNascimento(paciente.dataDeNascimento);
    setBairro(paciente.bairro);
    setCep(paciente.cep);
    setCidade(paciente.cidade);
    setComplemento(paciente.complemento);
    setEstado(paciente.estado);
    setNumero(paciente.numero);
    setRua(paciente.rua);
    if (pacienteCadastrado) {
      setId(paciente.id);
    } else {
      setId(idPaciente);
    }
  }, [pacienteCadastrado]);

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Header
            name={nomeColaborador}
            matricula={registroColaborador}
            titleButton="Voltar"
            handleFunction={() => navigate("/recepcao")}
          />
          <Banner title="Dados Paciente" />
          <SectionForms>
            <Forms>
              <Row>
                <InputForm
                  title={"Nome completo"}
                  propsWidth={"50%"}
                  propsPlaceHolder={"Digite o nome"}
                  propsValue={nome}
                  handleFunction={(e) => {
                    setNome(e.target.value);
                  }}
                />
                <InputForm
                  title={"CPF"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o CPF"}
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexCpf(e.target.value);
                    setCpf(mask);
                  }}
                  type={"text"}
                  propsValue={cpf}
                  propsMaxLength={14}
                  disabled={true}
                />
                <InputForm
                  title={"Telefone"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o telefone"}
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexTelefone(e.target.value);
                    setTelefone(mask);
                  }}
                  type={"text"}
                  propsValue={telefone}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Data de Nascimento"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite a data de nascimento"}
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexData(e.target.value);
                    setDataNascimento(mask);
                  }}
                  type={"text"}
                  propsValue={dataNascimento}
                  disabled={true}
                />
                <Dropbox
                  propsWidth={"33%"}
                  title={"Gênero"}
                  option1={"CisHomem"}
                  option2={"CisMulher"}
                  option3={"TransHomem"}
                  option4={"TransMulher"}
                  option5={"Outro"}
                  initialValue={genero}
                  onSelect={(value) => {
                    setGenero(value);
                  }}
                />
                <InputForm
                  title={"CEP"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite o CEP"}
                  propsRequired={false}
                  handleBlurFunction={(e) => {
                    handleBlurCep(e.target.value);
                  }}
                  handleFunction={(e) => {
                    const mask = RegexCep(e.target.value);
                    setCep(mask);
                  }}
                  type={"text"}
                  propsValue={cep}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Rua"}
                  propsWidth={"50%"}
                  propsPlaceHolder={"Digite a rua"}
                  propsValue={rua}
                  handleFunction={(e) => {
                    setRua(e.target.value);
                  }}
                />
                <InputForm
                  title={"Numero"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o nº"}
                  propsValue={numero}
                  handleFunction={(e) => {
                    setNumero(e.target.value);
                  }}
                />
                <InputForm
                  title={"Complemento"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o complemento"}
                  propsValue={complemento}
                  handleFunction={(e) => {
                    setComplemento(e.target.value);
                  }}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Bairro"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite o bairro"}
                  propsValue={bairro}
                  handleFunction={(e) => {
                    setBairro(e.target.value);
                  }}
                />
                <InputForm
                  title={"Cidade"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite a cidade"}
                  propsValue={cidade}
                  handleFunction={(e) => {
                    setCidade(e.target.value);
                  }}
                />
                <InputForm
                  title={"Estado"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite o estado"}
                  propsValue={estado}
                  handleFunction={(e) => {
                    setEstado(e.target.value);
                  }}
                />
              </Row>
              <RowCheckbox>
                <Button title={"Atualizar"} handleFunction={handleClick} />
                <Button title={"Triagem"} handleFunction={handleTriagem} />
              </RowCheckbox>
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
