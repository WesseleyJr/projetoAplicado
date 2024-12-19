import { styled } from 'styled-components';

export const Container = styled.nav`
    border-radius: 0 0 30px 30px;
    background-color: var(--branco-secundario);
    height: 60px;
    padding: 10px 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    position: fixed;
`;

export const Linha = styled.div`
    height: 30px;
    width: 2px;
    background-color: var(--preto-primario);
`;

export const Button = styled.button`
    border: none;
    font-size: 30px;
    font-weight: 600;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
`;

export const Icon = styled.img`
    width: 35px;
`;

export const MenuList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 0;
    padding: 0;
`;

export const MenuItem = styled.li`
    display: flex;
    align-items: center;
`;
