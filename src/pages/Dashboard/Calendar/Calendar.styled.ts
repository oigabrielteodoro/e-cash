import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { BaseElement } from 'ui/Tooltip/Tooltip.styled'

type ContainerProps = {
  isOpen: boolean
}

type CalendarItemProps = {
  isSelected: boolean
  isInside?: boolean
}

export const Wrapper = styled.section`
  position: relative;
`

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  color: ${theme.colors.neutral[500]};
  transition: 300ms;

  svg:last-child {
    transition: 300ms;

    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: rotate(-180deg);
      `}
  }

  &:hover {
    color: ${theme.colors.neutral[700]};
  }

  > span {
    margin: 0 1rem;
  }
`

export const Calendar = styled(motion.div).attrs({
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
})`
  position: absolute;
  background: ${theme.colors.white};
  border-radius: 1rem;
  box-shadow: 0 0 10rem 1rem rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  right: 0;
  top: calc(100% + 1.6rem);

  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1rem;
  }
`

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  section {
    display: flex;
    align-items: center;

    button {
      background: ${theme.colors.neutral[100]};
      border: 0;
      height: 4.2rem;
      width: 4.2rem;
      border-radius: 1rem;
      color: ${theme.colors.neutral[500]};
      transition: 300ms;

      &:hover {
        background: ${theme.colors.neutral[200]};
      }
    }

    ${BaseElement} + ${BaseElement} {
      margin-left: 1rem;
    }
  }
`

export const CalendarItem = styled.button<CalendarItemProps>`
  background: ${theme.colors.neutral[100]};
  border: 0;
  height: 4.2rem;
  width: 4.2rem;
  border-radius: 1rem;
  transition: 300ms;

  &:hover {
    background: ${theme.colors.neutral[200]};
  }

  ${({ isInside }) =>
    isInside &&
    css`
      color: ${theme.colors.blue[500]};
      background: ${theme.colors.blue[100]};

      &:hover {
        background: ${theme.colors.blue[300]};
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${theme.colors.white};
      background: ${theme.colors.blue[500]};

      &:hover {
        background: ${theme.colors.blue[500]};
        filter: brightness(0.8);
      }
    `}
`
