import styled from 'styled-components'

export const Pai = styled.div`
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 15px;
    
`
export const Graficos = styled.div`
    padding-top: 10%;
    width: 950px;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    
`
export const GraficoPizza = styled.div`
    padding-top: 10%;
    width: 500px;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    
`
export const Body = styled.div`
    display: contents;
    flex-direction: center;
    align-items: center;
    border-left: 15%;
`
export const DivBotoes = styled.div`
    padding-top: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Titulo = styled.h1`
    display: grid;
    justify-content: center;
    flex-direction: row;
    align-items: center;
`
export const Botao = styled.button`
     align-items: center;
    font-style: italic;
    background-color: #4CAF50; 
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition-duration: 0.4s;
    padding: 10px 24px;

    &:hover {
        background-color: white; 
        color: black; 
        border: 2px solid #4CAF50;
    }
`
export const Input = styled.input.attrs({ type: 'file' })`
    display: none;

    + label {
        align-items: center;
        font-style: italic;
        background-color: #4CAF50; 
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition-duration: 0.4s;
        padding: 10px 24px;

       &:hover {
            background-color: white; 
            color:black; 
            border :2 px solid #4CAF50 ;
       }
    }
`
export const Loading = styled.h2`
    padding-top: 5%;
`
