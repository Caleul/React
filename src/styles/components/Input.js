import styled from 'styled-components';

export const Input = styled.input`
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
