import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import MenuAccessibility from "../../components/MenuAccessibility";
import { Card, Container, Forms, Row, SectionForms } from "./styles";
import { GetCpf, LoginApi } from "../../service/login";
import Toastify from "../../components/Toastify/index.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UseContext.jsx";
import PasswordInput from "../../components/SenhaInput";



export default function Login() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const {setColaborador, setRegistroColaborador, setNomeColaborador, setIdColaborador} = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const data = {
      username: cpf,
      password: senha,
    };
  
    const result = await LoginApi(data);
    if (result.sucess) {
      toast.success("Login realizado");
      const jwtToken = result.data.split(" ")[1];
  
      localStorage.setItem("token", jwtToken);
  
      const sub = getUserEmailFromToken(jwtToken);
      const colaboradorResult = await GetCpf(sub);
  
      if (colaboradorResult.sucess) {
        setColaborador(colaboradorResult.data)
        const { nome, registro, id } = colaboradorResult.data;
        setNomeColaborador(nome);
        setRegistroColaborador(registro);
        setIdColaborador(id)
      } else {
            if (result.data && result.data.erros && result.data.erros.length > 0) {
              toast.error(result.data.erros[0]);
            } else {
              toast.error("Erro desconhecido, tente novamente.");
            }
          }
  
      NavigatePage(colaboradorResult.data.perfis[0]);
    } else {
          if (result.data && result.data.erros && result.data.erros.length > 0) {
            toast.error(result.data.erros[0]);
          } else {
            toast.error("Erro desconhecido, tente novamente.");
          }
        }
  };

   const NavigatePage = (role) =>{
    if(role === 'ROLE_MEDICO'){
      navigate('/fila/medico')
    }
    if(role === 'ROLE_RECEPCAO'){
      navigate('/recepcao')
    }
    if(role === 'ROLE_TRIAGEM'){
      navigate('/fila/triagem')
    }
    if(role === 'ROLE_EXAME'){
      navigate('/fila/enfermagem')
    }

   }

   const getUserEmailFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };
  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
        <Banner title='Faça seu Login'/>
          <SectionForms>
            <Forms onSubmit={handleLogin}>
              <Row>
                <InputForm
                  title={"CPF"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Digite o CPF"}
                  propsRequired={true}
                  handleFunction={(e) => setCpf(e.target.value)}
                />
              </Row>
              <Row>
              <PasswordInput
                  title={"Senha"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Digite sua senha"}
                  propsValue={senha}
                  handleFunction={(e) => setSenha(e.target.value)}
                  propsRequired={true}
              />
              </Row>
              <Button title={"Entrar"} type={"submit"} />
            </Forms>
          </SectionForms>
        </Card>
        <Toastify/>
      </Container>
    </>
  );
}