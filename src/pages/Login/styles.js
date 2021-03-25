import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  color: #fff;
`;

export const PhotoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  background-color: #4672ec;
  justify-content: center;

  h1 {
    padding-top: 90px;
    font-size: 30px;
    line-height: 21px;
    letter-spacing: 0.1px;
  }
  div {
    flex-grow: 1;
    margin: 170px 0;
  }
  img {
    width: 100%;
    max-width: 645px;
    max-height: 367px;
    height: auto;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background-color: #0d1836;
  height: 100%;

  h1 {
    padding-top: 90px;
    font-size: 30px;
    line-height: 21px;
    letter-spacing: 0.1px;
  }

  p {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 20px;
    line-height: 21px;
    letter-spacing: 0.1px;

    color: #ababab;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 120px 0;
  flex-grow: 1;
  font-size: 15px;
  line-height: 30px;

  input {
    margin: 15px 0;
    padding-left: 25px;
    width: 394px;
    height: 47px;
    left: 995px;
    top: 281px;
    background: #ffffff;
    border-radius: 30px;
    border: 0;

    ::-webkit-input-placeholder {
      color: #545454;
      font-size: 15px;
    }

    ::-moz-placeholder {
      color: #545454;
      font-size: 15px;
    }
  }
  button {
    margin-top: 70px;
    width: 394px;
    height: 47px;
    background: #4672ec;
    border-radius: 30px;
    border: 0;
    font-size: 20px;
    line-height: 30px;
    color: #ffffff;
  }
  a {
    align-self: flex-end;
    text-decoration: none;
    color: #fff;
  }
`;
