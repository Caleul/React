import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 265px 1fr;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #0d1836;
  color: #ffffff;
  align-items: center;
`;

export const Title = styled.div`
  margin: 71px;
  h1 {
    font-size: 50px;
    line-height: 21px;
    font-weight: bold;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 14px;
    margin-bottom: 30px;
  }
`;
export const FormSection = styled.div`
  display: flex;
  max-width: 600px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Select = styled.select`
  margin: 15px 0;
  padding-left: 20px;
  min-width: 240px;
  height: 40px;
  border-radius: 30px;
  border: 0;
  background: rgba(196, 196, 196, 0.3);
  color: #fff;
`;
