import React from 'react'
import { Button, Col, Row, UploadAvatar } from 'ui'

import * as S from './CreateAvatar.styled'

export function CreateAvatar() {
  return (
    <>
      <strong>Pose for the photo!</strong>
      <p>You are about to create your account... This step is not mandatory</p>

      <S.Form>
        <UploadAvatar />
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Button size='lg' variant='outline'>
              Skip this step
            </Button>
          </Col>
          <Col span={12}>
            <Button size='lg'>Upload avatar</Button>
          </Col>
        </Row>
      </S.Form>
    </>
  )
}
