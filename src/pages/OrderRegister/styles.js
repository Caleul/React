import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100vh;
  align-self: center;
`;

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;

  div {
    align-self: center;
    span {
      margin-right: 5px;
    }
  }
`;

export const TextArea = styled.textarea`
  padding-top: 10px;
  outline: none;
  resize: none;
  overflow: auto;
  margin: 15px 0;
  padding-left: 20px;
  min-width: 240px;
  height: 40px;
  border-radius: 30px;
  border: 0;
  background: rgba(196, 196, 196, 0.3);
  color: #fff;

  ::-webkit-input-placeholder {
    color: #fff;
    font-size: 14px;
  }
  ::-moz-placeholder {
    color: #fff;
    font-size: 14px;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const LensInput = styled.div`
  display: flex;
  max-width: 240px;

  input {
    min-width: 0;
  }
  input + input {
    margin-left: 5px;
  }
`;
