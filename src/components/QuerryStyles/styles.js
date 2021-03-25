import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 265px 1fr;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 50px 50px auto 50px;
  padding: 2vh 5%;
  grid-gap: 2vh;
`;

export const Header = styled.div`
  display: grid;
  grid-column: 1 / 4;
  grid-row: 1;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  > h1 {
    grid-column: 1 / 5;
    grid-row: 1;
    text-align: center;
  }

  > button {
    grid-column: 4;
    grid-row: 1;

    > svg {
      margin-right: 10px;
    }
  }
`;

export const Search = styled.div`
  display: grid;
  grid-column: 1 / 4;
  grid-row: 2;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  > h2 {
    grid-column: 1 / 4;
    grid-row: 1;
    align-content: center;
  }

  > input {
    grid-column: 4;
    grid-row: 1;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 20px;
    color: #7b7b7b;

    ::placeholder {
      color: #7b7b7b;
    }
  }
`;

export const Table = styled.div`
  grid-column: 1 / 4;
  grid-row: 3;
  background-color: #fff;
  border-radius: 30px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
`;

export const Pagnation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column: 1 / 4;
  grid-row: 4;

  > div {
    display: flex;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #acadad;
    background-color: #fff;
    justify-content: center;
    width: 100px;
    height: 35px;

    > button {
      flex: 1;
      border: 0px;
      background-color: #fff;
      transition: all 0.2s;

      :hover {
        background-color: #eee;
      }
    }

    button + button {
      border-left: 1px solid #acadad;
    }
  }
`;

export const ButtonEdit = styled.button`
  display: flex;
  background: transparent;
  border: 0;
  padding: 0 20px;
`;

export const TypeForm = styled.div`
  grid-column: 2 / 3;
  grid-row: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    width: 100px;
    align-content: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid #ddd;
  }
  button {
    flex: 1;
    height: 24px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
  }
  button + button {
    border-left: 1px solid #ddd;
  }
`;
