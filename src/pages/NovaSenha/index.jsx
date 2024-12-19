import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MenuAccessibility from "../../components/MenuAccessibility";
import Button from "../../components/Button";
import InputForm from "../../components/InputForm";
import { Container, Card, Forms, Row, SectionForms } from "./styles";
import Banner from "../../components/Banner";

export default function NovaSenha() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    console.log({ senha, confirmaSenha });
  }

  return (
    <>
      <MenuAccessibility />
      <Container>
        <Card>
          <Banner title="Nova Senha" />
          <SectionForms>
            <Forms onSubmit={handleLogin}>
              <Row>
                <InputForm
                  title={"Senha"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Digite sua senha"}
                  propsRequired={true}
                  handleFunction={(e) => setSenha(e.target.value)}
                />
              </Row>
              <Row>
                <InputForm
                  title={"Confirma Senha"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Confirme sua senha"}
                  propsType={"password"}
                  propsRequired={true}
                  handleFunction={(e) => setConfirmaSenha(e.target.value)}
                />
                
              </Row> 
              <Row>
                <InputForm
                  title={"Digite seu Token"}
                  propsWidth={"100%"}
                  propsPlaceHolder={"Digite seu Token"}
                  propsType={"password"}
                  propsRequired={true}
                  handleFunction={(e) => setDigiteSeuToken(e.target.value)}
                />
                
              </Row> 
              <Button title={"Alterar Senha"} type={"submit"} />
            </Forms>
          </SectionForms>
        </Card>
      </Container>
    </>
  );
}
