import styled from "styled-components";
import ReactSelect from 'react-select';
import { Button } from '../../../components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 10vh;
`;

export const Form = styled.form`
    border-radius: 20px;
    background-color: #363636; /* Alterado para fundo preto */
    padding: 32px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Label = styled.label`
    color: white; /* Alterado para branco para melhor contraste */
    font-size: 14px;
    font-weight: 400;
`;

export const Input = styled.input`
    width: 100%;
    height: 44px;
    border-radius: 5px;
    padding: 0;
    border: none;
    background-color: #f1f1f1; /*fundo escuro p/ combinar com o formulário */
    color: #1f1f1f; /* Texto branco para legibilidade */
    font-weight: 500;
`;

export const LabelUploads = styled.label`
    cursor: pointer;
    border: 1px dashed white; /* Borda branca para melhor visibilidade */
    border-radius: 5px;
    padding: 10px;
    display: flex;
    color: white;
    margin-top: 20px;
    font-weight: 300;

    > svg {
        width: 20px;
        height: 20px;
        fill: white;
        margin-right: 4px;
    }

    input {
        display: none;
    }
`;

export const Select = styled(ReactSelect)`
    .react-select__control {
        background-color: #222 !important; /* Fundo escuro */
        color: white !important; /* Texto branco */
        border: none;
    }
    .react-select__menu {
        background-color: #222 !important;
    }
    .react-select__option {
        color: white !important;
    }
`;

export const SubmitButton = styled(Button)`
    margin-top: 40px;
`;

export const ErrorMessage = styled.span`
    color: red; /* Vermelho para destacar os erros */
    font-size: 14px;
    line-height: 80%;
    font-weight: 600;
`;

export const ContainerCheckBox = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;
    margin-top: 10px;

    input{
        cursor: pointer;
    }
`