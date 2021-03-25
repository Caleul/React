import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,700&display=swap');
  *{
    margin:0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    min-height: 100%;
  }
  body {
    background: linear-gradient(to bottom, #2a5470, #2e2868);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button{
    font: 14px Roboto, sans-serif;
  }

  a{
    text-decoration:none;
  }

  ul{
    list-style:none;
  }

  button{
    cursor:pointer;
  }
`;
