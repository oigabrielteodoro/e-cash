import type { Transition, Variants } from 'framer-motion'

type Props = {
  variants?: Variants
  transition?: Transition
}

export const fadeIn = ({ variants, transition }: Props = {}) => ({
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    ...variants,
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition,
})
