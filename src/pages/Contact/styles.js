import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: auto;

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 50px;
    line-height: 59px;
    color: #ffffff;
    margin-top: 70px;
    margin-bottom: 88px;
  }
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;

    color: #e5e5e5;
    margin-bottom: 18px;

    input {
      margin-top: 18px;
      padding-left: 21px;
      width: 419px;
      height: 50px;
      background: #ffffff;
      border: 0;
      border-radius: 11px;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 23px;
    }

    textarea {
      margin-top: 18px;
      padding: 13px 21px;
      width: 419px;
      height: 205px;
      background: #ffffff;
      border: 0;
      border-radius: 11px;
      resize: none;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 23px;
    }
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #150847;
  border: 0;
  margin: 0 auto;
  margin-top: 7px;
  width: 160px;
  height: 48px;
  border-radius: 11px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 35px;
    color: #ffffff;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100px;
  align-items: center;

  div {
    margin: 0 50px;
    display: flex;
    flex-direction: column;
  }

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #c9c9c9;

    & + span {
      margin-top: 10px;
    }
  }
`;
