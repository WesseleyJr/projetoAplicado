import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 100px;
  }

  @media (min-width: 1024px) {
    padding: 0 300px;
  }

  @media (min-width: 1366px) {
    padding: 0 150px;
  }
`;

export const Card = styled.main`
  background-color: var(--branco-transparente);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  border-radius: 20px;
  margin-bottom: 50px;
  margin-top: 100px;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    padding: 20px 40px;
    border-radius: 30px;
  }

  @media (min-width: 1024px) {
    border-radius: 50px;
  }

  @media (min-width: 1366px) {
    padding: 20px 60px;
    border-radius: 40px;
  }
`;

export const Section = styled.section`
  width: 100%;
  padding: 20px 0;

  @media (min-width: 768px) {
    padding: 50px 0;
  }

  @media (min-width: 1366px) {
    padding: 60px 0;
  }
`;

export const TitleCard = styled.div`
  background-color: var(--branco-primario);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 10px;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;

  @media (min-width: 1366px) {
    padding: 15px;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1366px) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  margin-top: 10px;
  padding: 15px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1366px) {
    padding: 25px;
  }
`;

export const Button = styled.button`
  background-color: var(--azul-secundario);
  color: var(--branco-primario);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--azul-primario);
  }

  @media (min-width: 1366px) {
    padding: 12px 24px;
  }
`;

export const Dropdown = styled.div`
 margin-top: 10px;
  padding: 15px;
  background-color: var(--branco-primario);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1366px) {
    padding: 25px;
  }
`;

export const DropdownButton = styled(Button)`
  margin-left: 10px;
`;

export const TitleH3 = styled.h3`
  color: #000;
  font-size: calc(var(--font-size) + 4px);
  font-weight: 600;

`