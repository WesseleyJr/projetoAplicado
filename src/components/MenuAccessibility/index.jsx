import React from "react";
import IconDarkMode from "../../assets/images/IconDarkMode.png";
import { Button, Container, Icon, Linha, MenuItem, MenuList } from "./styles";
import { useAccessibility } from "../../context/AccessibilityContext";

export default function MenuAccessibility() {
  const { toggleDarkMode, increaseFontSize, decreaseFontSize } =
    useAccessibility();
  return (
    <Container>
      <MenuList>
        <MenuItem>
          <Button onClick={toggleDarkMode} tabIndex={0}>
            <Icon src={IconDarkMode} alt="ícone modo escuro" />
          </Button>
        </MenuItem>
        <Linha />
        <MenuItem>
          <Button onClick={increaseFontSize} tabIndex={0}>A+</Button>
        </MenuItem>
        <Linha />
        <MenuItem>
          <Button onClick={decreaseFontSize} tabIndex={0}>A-</Button>
        </MenuItem>
      </MenuList>
    </Container>
  );
}
