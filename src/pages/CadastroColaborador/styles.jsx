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

export const Card = styled.main`
  background-color: var(--branco-transparente);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  flex-direction: column;
  border-radius: 50px;
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 100px;

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
    padding: 30px 60px;
    border-radius: 40px;
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

  @media (min-width: 1366px) {
    padding: 60px 0;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }

  @media (min-width: 1366px) {
    gap: 30px;
  }
`;

export const RowCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;