import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  img {
    width: 606px;
    height: 424px;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 56px;
    text-align: center;
    color: #ffffff;
    max-width: 630px;
    margin-bottom: 40px;
  }

  button {
    position: absolute;
    bottom: 80px;
    right: 50px;
    background: #150847;
    border: 0;
    width: 271px;
    height: 48px;
    border-radius: 11px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: #ffffff;
      margin-left: 11px;
    }

    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 30px;
      line-height: 35px;
      color: #ffffff;
    }
  }
`;
