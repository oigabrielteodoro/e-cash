import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wrapper as InputWrapper } from 'ui/Input/Input.styled'

import { theme } from 'config'

export const Container = styled(motion.section).attrs({
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  transition: {
    duration: 2,
  },
})`
  padding: 15rem 22rem;

  h1 {
    display: inline-flex;
    font-size: ${theme.font.sizes.title};
    font-weight: 600;
  }

  h4 {
    margin-top: 1rem;
    font-weight: 400;
    color: ${theme.colors.neutral[500]};
  }

  form {
    margin-top: 5rem;

    ${InputWrapper} {
      margin-top: 1.6rem;
    }
  }
`

export const ForgotPasswordLink = styled(Link)`
  display: block;
  margin: 2rem 0;
  color: ${theme.colors.neutral[500]};
  font-weight: 500;
  transition: 300ms;
  position: relative;
  width: 16rem;

  &::before {
    content: '';
    position: absolute;
    background: ${theme.colors.blue[500]};
    height: 0.1rem;
    width: 0;
    bottom: -0.3rem;
    left: 0;
    transition: 300ms;
  }

  &:hover {
    color: ${theme.colors.blue[500]};

    &::before {
      width: 100%;
    }
  }
`

export const Separator = styled.span`
  display: block;
  margin: 2.4rem 0;
  text-align: center;
  position: relative;
  color: ${theme.colors.neutral[500]};

  &::before {
    content: '';
    position: absolute;
    left: 2.6rem;
    width: calc(50% - 6rem);
    height: 0.1rem;
    background: ${theme.colors.neutral[500]};
    top: 50%;
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    right: 2.6rem;
    width: calc(50% - 6rem);
    height: 0.1rem;
    background: ${theme.colors.neutral[500]};
    top: 50%;
    transform: translateY(-50%);
  }
`

export const CreateAccountLink = styled(Link)`
  display: block;
  color: ${theme.colors.blue[500]};
  font-weight: 500;
  transition: 300ms;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`
