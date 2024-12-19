import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/index.jsx";
import Button from "../../components/Button/index.jsx";
import InputForm from "../../components/InputForm/index.jsx";
import MenuAccessibility from "../../components/MenuAccessibility/index.jsx";
import { consultaCep } from "../../service/viaCep.js";
import {
  Card,
  Container,
  Forms,
  Row,
  RowCheckbox,
  SectionForms,
} from "./styles.jsx";
import Checkbox from "../../components/Checkbox/index.jsx";
import { inserirFuncionario } from "../../service/adm.js";
import Dropbox from "../../components/DropBox/index.jsx";
import {
  RegexCep,
  RegexCpf,
  RegexData,
  RegexTelefone,
} from "../../service/RegexMask.js";
import { toast } from "react-toastify";
import Toastify from "../../components/Toastify/index.jsx";
import { useAuth } from "../../context/UseContext.jsx";
import Header from "../../components/Header/index.jsx";

export default function CadastroColaborador() {
  const { nomeColaborador, registroColaborador } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [registro, setRegistro] = useState("");
  const [perfil, setPerfil] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async (event) => {
    event.preventDefault();
    const funcionario = {
      nome: nome,
      registro: registro,
      senha: senha,
      confirmaSenha: confirmarSenha,
      cpf: cpf.replace(/\D/g, ""),
      dataNascimento: dataNascimento,
      email: email,
      cep: cep.replace(/\D/g, ""),
      rua: rua,
      cidade: cidade,
      bairro: bairro,
      numero: numero,
      complemento: complemento,
      estado: estado,
      telefone: telefone.replace(/\D/g, ""),
      especialidade: especialidade,
      perfis: [
        {
          id: perfilNumber(perfil),
        },
      ],
    };

    const result = await inserirFuncionario(funcionario);

    if (result.sucess) {
      toast.success("Sucesso ao Cadastrar");
    } else {
      toast.error(result.data.response.data.erros[0]);
    }
  };

  const perfilNumber = (perfil) => {
    if (perfil === "ROLE_MEDICO") {
      return 2;
    }
    if (perfil === "ROLE_RECEPCAO") {
      return 3;
    }
    if (perfil === "ROLE_TRIAGEM") {
      return 4;
    }
    if (perfil === "ROLE_EXAME") {
      return 5;
    }
  };

  const handleBlurCep = async (cep) => {
    const cepJson = await consultaCep(cep);
    if (cepJson) {
      setRua(cepJson.logradouro);
      setCidade(cepJson.localidade);
      setBairro(cepJson.bairro);
      setEstado(cepJson.uf);
    } else {
      toast.error("Erro ao buscar CEP");
    }
  };

  const handleCheckboxChange = (perfil) => {
    setPerfil(perfil);
  };

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Banner title="Cadastro Colaborador" />
          <SectionForms>
            <Forms onSubmit={handleClick}>
              <Row>
                <InputForm
                  title={"Nome completo"}
                  propsWidth={"60%"}
                  propsPlaceHolder={"Digite o nome"}
                  propsRequired={true}
                  handleFunction={(e) => setNome(e.target.value)}
                />
                <InputForm
                  title={"CPF"}
                  propsWidth={"37%"}
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
              </Row>
              <Row>
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
                <InputForm
                  title={"Data de Nascimento"}
                  propsWidth={"30%"}
                  propsPlaceHolder={"Digite a data de nascimento"}
                  propsRequired={true}
                  handleFunction={(e) => {
                    const mask = RegexData(e.target.value);
                    setDataNascimento(mask);
                  }}
                  type={"text"}
                  propsValue={dataNascimento}
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
                  propsWidth={"60%"}
                  propsPlaceHolder={"Digite a rua"}
                  propsValue={rua}
                  propsRequired={true}
                  handleFunction={(e) => setRua(e.target.value)}
                />
                <InputForm
                  title={"Bairro"}
                  propsWidth={"37%"}
                  propsPlaceHolder={"Digite o bairro"}
                  propsValue={bairro}
                  propsRequired={true}
                  handleFunction={(e) => setBairro(e.target.value)}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Numero"}
                  propsWidth={"15%"}
                  propsPlaceHolder={"Digite o nº"}
                  propsValue={numero}
                  propsRequired={true}
                  handleFunction={(e) => setNumero(e.target.value)}
                />
                <InputForm
                  title={"Complemento"}
                  propsWidth={"40%"}
                  propsPlaceHolder={"Digite o complemento"}
                  propsRequired={false}
                  propsValue={complemento}
                  handleFunction={(e) => setComplemento(e.target.value)}
                />
                <InputForm
                  title={"Estado"}
                  propsWidth={"60%"}
                  propsPlaceHolder={"Digite o Estado"}
                  propsValue={estado}
                  propsRequired={true}
                  handleFunction={(e) => setEstado(e.target.value)}
                />
                <InputForm
                  title={"Cidade"}
                  propsWidth={"40%"}
                  propsPlaceHolder={"Digite a cidade"}
                  propsValue={cidade}
                  propsRequired={true}
                  handleFunction={(e) => setCidade(e.target.value)}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Email"}
                  propsWidth={"40%"}
                  propsPlaceHolder={"Digite seu Email"}
                  propsValue={email}
                  propsRequired={true}
                  handleFunction={(e) => setEmail(e.target.value)}
                />
                <InputForm
                  title={"Senha"}
                  propsWidth={"40%"}
                  propsPlaceHolder={"Digite sua senha"}
                  propsValue={senha}
                  propsRequired={true}
                  handleFunction={(e) => setSenha(e.target.value)}
                />
                <InputForm
                  title={"Confirmar Senha"}
                  propsWidth={"40%"}
                  propsPlaceHolder={"Confirme sua Senha"}
                  propsValue={confirmarSenha}
                  propsRequired={true}
                  handleFunction={(e) => setConfirmarSenha(e.target.value)}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Registro"}
                  propsWidth={"60%"}
                  propsPlaceHolder={"ex: CRM"}
                  propsValue={registro}
                  propsRequired={true}
                  handleFunction={(e) => setRegistro(e.target.value)}
                />
                <Dropbox
                  title={"Especialidade"}
                  initialValue="Especialidade"
                  propsWidth="40%"
                  onSelect={(value) => setEspecialidade(value)}
                  option1={"Oncologia_Clínica"}
                  option2={"Oncologia_Pediátrica"}
                  option3={"Oncologia_Mamária"}
                  option4={"Oncologia_Urológica"}
                  option5={"Outros"}
                />
              </Row>
              <RowCheckbox>
                <Checkbox
                  label={"Médico"}
                  checked={perfil.includes("ROLE_MEDICO")}
                  onChange={() => handleCheckboxChange("ROLE_MEDICO")}
                />
                <Checkbox
                  label={"Recepção"}
                  checked={perfil.includes("ROLE_RECEPCAO")}
                  onChange={() => handleCheckboxChange("ROLE_RECEPCAO")}
                />
                <Checkbox
                  label={"Triagem"}
                  checked={perfil.includes("ROLE_TRIAGEM")}
                  onChange={() => handleCheckboxChange("ROLE_TRIAGEM")}
                />
                <Checkbox
                  label={"Exame"}
                  checked={perfil.includes("ROLE_EXAME")}
                  onChange={() => handleCheckboxChange("ROLE_EXAME")}
                />
              </RowCheckbox>
              <Button title={"Cadastrar"} type={"submit"} />
            </Forms>
          </SectionForms>
        </Card>
        <Toastify />
      </Container>
    </>
  );
}
