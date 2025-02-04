import styled from "styled-components";

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;
`

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        color: #fff;
        border-radius: 4px;
        background-color: #9758a6;
        transition: all 0.4s;
        border: none;
        font-weight: 500;

        &:hover{
            background-color: #6f357c;
        }
    }
`

export const EmptyCartWrapper = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`

export const TrashImage = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;
`