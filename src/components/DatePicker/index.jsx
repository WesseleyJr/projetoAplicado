import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { Container, Input, Label } from "./styles";

export default function DateTimeInput({
  title,
  selectedDate,
  onChange,
  propsWidth,
  propsHeigth,
  propsRequired = false,
  disabled = false,
}) {
  return (
    <Container style={{ width: propsWidth ? propsWidth : "100%" }}>
      <Label>{title}</Label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="Pp"
        locale={ptBR}
        timeCaption="Horário"
        required={propsRequired}
        disabled={disabled}
        customInput={
          <Input
            style={{ height: propsHeigth }}
            disabled={disabled}
          />
        }
      />
    </Container>
  );
}
