import React from 'react'
import styled, { keyframes, css } from "styled-components"


export const Container = styled.div`
 max-width: 700px;
 background-color: #fff;
 border-radius: 4px;
 padding: 30px;
 margin: 80px auto;
 box-shadow: 0 0 20px rgba(0,0,0,0.2);
 h1{
  display: flex;
  font-size: 20px;
  flex-direction: row ;
  align-items: center;

  svg{
    margin-right: 10px;
  }
 }

`
export const DeleteButton = styled.button.attrs({
  type: 'button', 
})`
 background-color: transparent;
 border: none;
 margin-right: 6px;
 margin-left:3px;
 color:#0D2636;
`;

export const List = styled.ul`
 list-style-type: none;
 margin-top: 20px;

 li{
  padding: 15px 0 ;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
  & + li{
  border-top: 1px solid #ccc;
  }
  a{
    color:#0D2636;
    text-decoration: none;
  }
 }
`;

export const Form = styled.form`
  margin-top:30px;
  display: flex;
  flex-direction: row;

  input{
    flex: 1;
    border: 1px solid ${props => (props.error ? '#FF0000' : '#DDD')};
    padding:10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//create the animation in button
const animate = keyframes`
 from {
  transform: rotate(0deg);
 }
 to{
  transform: rotate(360deg);
 }
`;
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  
  background-color: #0D2636;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;


  &[disabled]{
    cursor:not-allowed;
    opacity: 0.5;
  }


  ${props => props.loading &&
      css`
      svg{
        animation: ${animate} 2s linear infinite;
      }
      `
  }

`;


