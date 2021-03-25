import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 284px;
  border-right: 1px solid #fff;
  height: 100vh;
  text-align: center;
`;

export const Profile = styled.div`
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 70vh;
  border-bottom: 1px solid #e5e5e5;

  div.imagem {
    align-self: center;
    max-width: 215px;
    max-height: 254px;
    overflow: hidden;
    border-radius: 28px;

    img {
      align-self: center;
      max-height: 254px;
    }
  }

  div.toHome {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  h1 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }

  span {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }

  h2 {
    margin-bottom: 14px;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
  }

  strong {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #ffffff;
  }
`;

export const Skills = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  padding: 0 40px;
  justify-content: space-around;

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
  }

  span {
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-height: 95px;
  border-bottom: 1px solid #ffffff;
  align-items: center;

  div {
    min-width: 284px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 23px;
      color: #ffffff;
    }
  }
  input {
    width: 244px;
    height: 26px;
    background: #ffffff;
    border-radius: 39px;
    border: 0;
  }
`;
export const Categories = styled.div``;
export const Proyectos = styled.div``;
