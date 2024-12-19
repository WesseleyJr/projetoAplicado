import React from 'react';
import { Container, Input, Label } from './styles';

export default function Checkbox({ label, checked, onChange }) {
  return (
    <Container>
      <Label className="form-check-label">{label}</Label>
      <Input type="checkbox" checked={checked} onChange={onChange} />
    </Container>
  );
}
