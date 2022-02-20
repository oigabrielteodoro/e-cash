import { theme } from 'config'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3.2rem;
  width: 100%;

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    width: 100%;

    & + fieldset {
      margin-top: 1.6rem;
    }

    &:last-child {
      margin-bottom: 1.6rem;
    }

    label {
      color: ${theme.colors.neutral[500]};
      font-size: ${theme.font.sizes.small};
    }

    input {
      margin-top: 0.8rem;
      appearance: none;
      background: ${theme.colors.neutral[300]};
      height: 0.5rem;
      border-radius: 1rem;
      transition: 300ms;

      &::-webkit-slider-thumb {
        transition: 300ms;
        appearance: none;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.3rem;
        background: ${theme.colors.blue[500]};
        cursor: pointer;
      }

      &:disabled {
        cursor: no-drop;
        opacity: 0.8;

        &::-webkit-slider-thumb {
          cursor: no-drop;
        }
      }
    }
  }
`

export const UploadAvatar = styled.label`
  img,
  svg {
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5rem 0.5rem ${theme.shadow.neutral[500]};
  }
`
