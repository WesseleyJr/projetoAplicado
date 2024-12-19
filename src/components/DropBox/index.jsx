import React, { useState, useEffect } from "react";
import { Container, Label, Input, Item, Menu } from "./styles";

export default function Dropbox({
  propsWidth,
  title,
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
  onSelect,
  initialValue = "Gênero",
}) {
  const [isSelect, setIsSelect] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setIsSelect(initialValue);
    }
  }, [initialValue]);

  const handleSelect = (value) => {
    setIsSelect(value);
    if (onSelect) onSelect(value);
  };

  return (
    <Container style={{ width: propsWidth ? propsWidth : "100%" }}>
      <Label>{title}</Label>
      <Input variant="primary" id="dropdown-basic">
        {isSelect}
      </Input>

      <Menu>
        <Item onClick={() => handleSelect(option1)}>{option1}</Item>
        <Item onClick={() => handleSelect(option2)}>{option2}</Item>
        <Item onClick={() => handleSelect(option3)}>{option3}</Item>
        <Item onClick={() => handleSelect(option4)}>{option4}</Item>
        <Item onClick={() => handleSelect(option5)}>{option5}</Item>
      </Menu>
    </Container>
  );
}
