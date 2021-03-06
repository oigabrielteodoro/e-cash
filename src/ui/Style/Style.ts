import { createGlobalStyle, css } from 'styled-components'

import { theme } from 'config'

type StyleProps = {
  isAuthenticated?: boolean
}

export const Style = createGlobalStyle<StyleProps>`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    font-family: ${theme.font.paragraph};
    font-size: ${theme.font.sizes.paragraph};
    background-color: ${theme.colors.white};

    ${({ isAuthenticated }) =>
      isAuthenticated &&
      css`
        background-color: ${theme.colors.neutral[200]};
      `}
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.font.title};
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  input:-webkit-autofill {
    box-shadow:0 0 0 5rem ${theme.colors.white} inset;
    -webkit-text-fill-color: ${theme.colors.neutral[900]};
  }

  input:-webkit-autofill:focus {
    box-shadow: 0 0 0 5rem ${theme.colors.white} inset;
    -webkit-text-fill-color: ${theme.colors.neutral[900]};
  }
`
