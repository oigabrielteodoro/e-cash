import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.li`
  padding: 1.6rem;
  transition: 300ms;
  cursor: pointer;
  color: ${theme.colors.neutral[600]};

  &:last-child {
    border-radius: 0 0 ${theme.radius.popover} ${theme.radius.popover};
  }

  &:hover {
    background: ${theme.colors.neutral[200]};
  }
`
