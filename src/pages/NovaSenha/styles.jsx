import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20%; 
  height: 100vh;

  @media (max-width: 1200px) {
    padding: 0 10%;
  }

  @media (max-width: 768px) {
    padding: 0 5%;
  }

  @media (max-width: 480px) {
    padding: 0 2%;
  }
`;

export const Card = styled.main`
  background: var(--branco-transparente);
  padding: 10px;
  border-radius: 50px;
  width: 100%;
  max-width: 600px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 20px;
  }
`;

export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px;

  @media (max-width: 480px) {
    gap: 15px; 
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 75%;

  @media (max-width: 480px) {
    flex-direction: column; 
    gap: 15px;
  }
`;

export const SectionForms = styled.div`
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;
