import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

import { theme } from 'config'
import type { ToastType } from 'ui'

type IconContainerProps = {
  type: ToastType
}

const iconBackgroundColor = {
  info: theme.colors.blue[500],
  error: theme.colors.red[500],
  success: theme.colors.green[500],
  warning: theme.colors.yellow[500],
}

export const Container = styled(ToastContainer)`
  .Toastify__toast-icon {
    display: none;
  }

  .Toastify__toast {
    border-radius: 1rem;
    box-shadow: none;
    padding: 0.5rem;
    min-height: 0;
  }

  .Toastify__close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 0.5rem;
    margin-right: 1rem;

    &:hover {
      background: ${theme.colors.white};
    }

    svg {
      color: ${theme.colors.neutral[600]};
    }
  }

  .Toastify__toast--error {
    background: ${theme.colors.red[100]};
    border: 0.2rem solid ${theme.colors.red[200]};
  }

  .Toastify__toast--warning {
    background: ${theme.colors.yellow[100]};
    border: 0.2rem solid ${theme.colors.yellow[200]};
  }

  .Toastify__toast--info {
    background: ${theme.colors.blue[100]};
    border: 0.2rem solid ${theme.colors.blue[200]};
  }

  .Toastify__toast--success {
    background: ${theme.colors.green[100]};
    border: 0.2rem solid ${theme.colors.green[200]};
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 1.8rem;
    color: ${theme.colors.neutral[700]};
  }
`

export const IconContainer = styled.div<IconContainerProps>`
  background: ${({ type }) => iconBackgroundColor[type]};
  height: 3.4rem;
  width: 3.4rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${theme.colors.white};
  }
`
