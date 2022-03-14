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
        scale: 0.7,
        transition: {
          duration: 0.2,
        },
      },
      visible: {
        opacity: 1,
        scale: 1,
      },
    },
  }),
)`
  min-width: 40rem;
  position: relative;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.modal};
  box-shadow: ${theme.dropShadow.popover};
  display: flex;
  flex-direction: column;
`

export const Title = styled.strong`
  font-weight: 500;
  font-size: ${theme.font.sizes.paragraph};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.6rem 1.6rem 0 2.4rem;
`

export const Content = styled.div`
  padding: 2.4rem 4.5rem 4.5rem 4.5rem;
`
