import styled from 'styled-components';

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

  @media (min-width: 1366px) {
    padding: 0 200px;
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

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--azul-primario-claro);
  margin-bottom: 20px;
  background-color: var(--branco-transparente); 
  color: var(--preto-secundario); 
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 8px; 
  border-radius: 10px; 
  overflow: hidden; 

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }

  @media (min-width: 1366px) {
    font-size: 16px;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--azul-primario-claro);
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--azul-primario-claro);
  border-right: 1px solid var(--azul-primario-claro);

  &.bold {
    font-weight: 600; 
  }

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }

  @media (min-width: 1366px) {
    padding: 10px;
  }
`;


export const TableCellPrioridade = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--azul-primario-claro);
  border-right: 1px solid var(--azul-primario-claro);
  color: var(--preto-primario); 
 
 background-color: ${({ prioridade }) => {
    switch (prioridade) {
      case 'EMERGÊNCIA':
        return 'var(--emergencia)';
      case 'MUITO_URGENTE':
        return 'var(--muito-urgente)';
      case 'URGENTE':
        return 'var(--urgente)';
      case 'POUCO_URGENTE':
        return 'var(--pouco-urgente)';
      case 'NÃO_URGENTE':
        return 'var(--nao-urgente)';
      default:
        return 'var(--default)';
    }
  }};



  &.bold {
    font-weight: 600; 
  }

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  background-color: var(--azul-primario);
  color: var(--branco-primario);
  border-bottom: 2px solid var(--azul-primario-claro);
  border-right: 1px solid var(--azul-primario-claro);
  font-weight: bold;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }

  @media (min-width: 1366px) {
    padding: 10px;
  }
`;

export const PaginationRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 5px;
  }

  @media (max-width: 480px) {
    gap: 2px;
  }

  @media (min-width: 1366px) {
    gap: 15px;
  }
`;

export const Nome = styled.a`
  color: var(--azul-link);
`;