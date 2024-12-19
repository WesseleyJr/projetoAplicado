import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 300px;

  @media (max-width: 1200px) {
    padding: 0 150px;
  }

  @media (max-width: 768px) {
    padding: 0 50px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

export const Card = styled.main`
  background-color: var(--branco-transparente);
  width: 100%;
  max-width: 800px; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px;
  flex-direction: column;
  border-radius: 40px;
  margin-top: 100px;
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;

  @media (max-width: 768px) {

    padding: 20px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  @media (min-width: 1366px) {
    padding: 40px 60px;
    border-radius: 50px;
  }
`;

export const SectionForms = styled.section`
  width: 100%;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    padding: 20px 0;
  }


  @media (min-width: 1366px) {
    padding: 50px 0;
  }

`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const FullWidthRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

@media (max-width: 480px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }

`;

export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;


  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }

  @media (min-width: 1366px) {
    gap: 25px;
  }

`;

export const CenteredButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;


  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

