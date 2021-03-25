import styled, { css } from 'styled-components';

const colors = {
  default: css`
    background: #4672ec;

    &:hover {
      background: #1546d0;
    }
  `,
  black: css`
    background: #000;

    &:hover {
      background: #333333;
    }
  `,
};

const Button = styled.button`
  display: flex;
  border-radius: 10px;
  transition: background-color 0.2s;
  background: #7289da;
  border: 0;
  color: #fff;
  padding: 0 50px;
  font-size: 16px;
  height: 45px;
  font-style: normal;
  font-weight: normal;
  align-items: center;
  align-content: center;
  justify-content: center;

  ${props => colors[props.color || 'default']}
`;

export default Button;
