import React, { useState, ChangeEvent } from 'react'
import { Tooltip, NotFoundAvatar, Avatar } from 'ui'

import * as S from './UploadAvatar.styled'

export function UploadAvatar() {
  const [zoom, setZoom] = useState('0')
  const [rotate, setRotate] = useState('0')

  const [previewUrl, setPreviewUrl] = useState<string | undefined>()

  const isDisabled = !previewUrl

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files

    if (!files) return

    const file = files[0]

    setPreviewUrl(URL.createObjectURL(file))
  }

  return (
    <S.Wrapper>
      <S.UploadAvatar htmlFor='avatar'>
        <Tooltip message='Select your file' position='top'>
          {previewUrl ? (
            <Avatar src={previewUrl} alt='Avatar' zoom={zoom} rotate={rotate} />
          ) : (
            <NotFoundAvatar />
          )}
        </Tooltip>
      </S.UploadAvatar>
      <input id='avatar' type='file' onChange={handleOnChange} hidden />

      <S.RangeContainer>
        <fieldset>
          <label htmlFor='zoom'>Zoom</label>
          <input
            id='zoom'
            type='range'
            value={zoom}
            defaultValue='0'
            onChange={(event) => setZoom(event.currentTarget.value)}
            disabled={isDisabled}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='rotate'>Rotacionar</label>
          <input
            id='rotate'
            type='range'
            value={rotate}
            defaultValue='0'
            max='360'
            onChange={(event) => setRotate(event.currentTarget.value)}
            disabled={isDisabled}
          />
        </fieldset>
      </S.RangeContainer>
    </S.Wrapper>
  )
}
