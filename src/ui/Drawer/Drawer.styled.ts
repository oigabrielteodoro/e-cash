import styled from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { fadeIn } from 'ui/_animations'

export const Container = styled.div`
  position: fixed;
  backdrop-filter: blur(0.1rem);
  overflow: none;
  z-index: ${theme.layers.base};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
`

export const Dialog = styled(motion.div).attrs(
  fadeIn({
    variants: {
      hidden: {
        opacity: 0,
        right: -100,
        transition: {
          duration: 0.2,
        },
      },
      visible: {
        opacity: 1,
        right: 0,
      },
    },
  }),
)`
  min-width: 50rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 3.2rem;
  border-bottom: 0.1rem solid ${theme.colors.neutral[200]};

  h3 {
    font-weight: 600;
  }
`

export const Body = styled.main`
  padding: 3.2rem;
  overflow-y: auto;
  height: 100%;
`

export const Footer = styled.footer`
  display: flex;
  padding: 2.4rem 3.2rem;
  border-top: 0.1rem solid ${theme.colors.neutral[200]};
`

export const CloseButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  background: transparent;
  color: ${theme.colors.neutral[500]};
  border-radius: ${theme.radius.popover};
  width: 4.2rem;
  height: 4.2rem;
  transition: 300ms;

  &:hover {
    background: ${theme.colors.neutral[100]};
  }
`
