import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 154px;
  border-right: 1px solid #fff;

  div {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  img {
    width: 73px;
    height: 73px;
    border-radius: 50%;
    background-color: #999;
    margin: 0 auto;
    margin-top: 56px;
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    margin-top: 13px;
    color: #ffffff;
  }

  div.icons {
    height: 182px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div.social {
    height: 253px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 39px;
  }
`;
