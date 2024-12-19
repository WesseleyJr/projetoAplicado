import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 400px;
  height: 100vh;

  @media (max-width: 1200px) {
    padding: 0 200px;
  }

  @media (max-width: 768px) {
    padding: 0 100px;
  }

  @media (max-width: 480px) {
    padding: 0 50px;
  }
`;

export const Card = styled.main`
  background-color: var(--branco-transparente);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  flex-direction: column;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 20px;
  }
`;

export const SectionForms = styled.section`
  width: 100%;
  padding: 50px 0;

  @media (max-width: 768px) {
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const Forms = styled.form`
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;