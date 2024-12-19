import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Dropbox from "../../components/DropBox";
import Header from "../../components/Header";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import Toastify from "../../components/Toastify";
import { usePaciente } from "../../context/PacienteContext";
import { useAuth } from "../../context/UseContext";
import { InserirPaciente } from "../../service/recepcao";
import { consultaCep } from "../../service/viaCep";
import { Card, Container, Forms, Row, SectionForms } from "./styles";
import {
  RegexCep,
  RegexCpf,
  RegexData,
  RegexTelefone,
} from "../../service/RegexMask.js";

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { setPacienteCadastrado, setPaciente, setIdPaciente } = usePaciente();
  const { nomeColaborador, registroColaborador } = useAuth();

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

  const handleClick = async (event) => {
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

    const result = await InserirPaciente(paciente);

    if (result.success) {
      toast.success("Sucesso ao Cadastrar");
      setPaciente(paciente);
      setIdPaciente(result.data.id);
      setTimeout(() => {
        navigate("/dados/paciente");
      }, 1000);
    } else {
      if (result.data && result.data.erros && result.data.erros.length > 0) {
        toast.error(result.data.erros[0]);
      } else {
        toast.error("Erro desconhecido, tente novamente.");
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
              navigate("/recepcao");
            }}
          />
          <Banner title="Cadastro Paciente" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title={"Nome completo"}
                  propsWidth={"50%"}
                  propsPlaceHolder={"Digite o nome"}
                  propsRequired={true}
                  handleFunction={(e) => setNome(e.target.value)}
                  propsValue={nome}
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
                />
                <InputForm
                  title={"Celular"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o celular"}
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
                />
                <Dropbox
                  propsWidth={"33%"}
                  title={"Gênero"}
                  option1={"CisHomem"}
                  option2={"CisMulher"}
                  option3={"TransHomem"}
                  option4={"TransMulher"}
                  option5={"Outro"}
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
                  propsRequired={true}
                  handleFunction={(e) => setRua(e.target.value)}
                />
                <InputForm
                  title={"Numero"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o nº"}
                  propsValue={numero}
                  propsRequired={true}
                  handleFunction={(e) => setNumero(e.target.value)}
                  type={"number"}
                />
                <InputForm
                  title={"Complemento"}
                  propsWidth={"25%"}
                  propsPlaceHolder={"Digite o complemento"}
                  propsRequired={false}
                  propsValue={complemento}
                  handleFunction={(e) => setComplemento(e.target.value)}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Bairro"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite o bairro"}
                  propsValue={bairro}
                  propsRequired={true}
                  handleFunction={(e) => setBairro(e.target.value)}
                />
                <InputForm
                  title={"Cidade"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite a cidade"}
                  propsValue={cidade}
                  propsRequired={true}
                  handleFunction={(e) => setCidade(e.target.value)}
                />
                <InputForm
                  title={"Estado"}
                  propsWidth={"33%"}
                  propsPlaceHolder={"Digite o estado"}
                  propsValue={estado}
                  propsRequired={true}
                  handleFunction={(e) => setEstado(e.target.value)}
                />
              </Row>
              <Button title={"Cadastrar"} type={"submit"} />
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
