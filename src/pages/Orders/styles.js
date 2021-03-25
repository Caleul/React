import styled from 'styled-components';

export const Container = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  padding: 2.5%;
  height: 100%;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Back = styled.button`
  border: 0;
  background: transparent;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
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
export const Filter = styled.div`
  background: #fff;
  border: 1px solid #b2b2b2;
  border-radius: 25px;
  overflow: hidden;

  button {
    background: transparent;
    border: 0;
    height: 24px;
    width: 90px;
    transition: all 0.2s;

    :hover {
      background: #eee;
    }
  }

  button + button {
    border-left: 1px solid #b2b2b2;
  }
`;

export const Table = styled.div`
  align-items: stretch;
  flex: 1;
  background: #fff;
  border: 1px solid #b2b2b2;
  border-radius: 20px;
  overflow: hidden;
`;
