import React from "react";
import InputMask from "react-input-mask";
import { Container, Label, Input } from "./styles";

export default function CPFInput({
  title,
  propsValue,
  handleFunction,
  propsWidth,
  propsRequired = false,
  placeholder = "Digite seu CPF",
}) {
  return (
    <Container style={{ width: propsWidth ? propsWidth : "100%" }}>
      <Label tabIndex={0}>{title}</Label>
      <InputMask
        tabIndex={0}
        mask="999.999.999-99"
        value={propsValue}
        onChange={handleFunction}
        required={propsRequired}
        placeholder={placeholder}
      >
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
    </Container>
  );
}
