import React, { useState } from "react";
import { Container, Label, Input, EyeIcon } from "./styles";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function PasswordInput({
  title,
  propsValue,
  handleFunction,
  propsWidth,
  propsRequired = false,
  propsPlaceHolder = "Digite sua senha",
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Container style={{ width: propsWidth ? propsWidth : "100%" }}>
      <Label>{title}</Label>
      <div style={{ position: "relative" }}>
        <Input
          type={isPasswordVisible ? "text" : "password"}
          value={propsValue}
          onChange={handleFunction}
          placeholder={propsPlaceHolder}
          required={propsRequired}
        />
        <EyeIcon
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          title={isPasswordVisible ? "Ocultar senha" : "Exibir senha"}
        >
          {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
        </EyeIcon>
      </div>
    </Container>
  );
}
