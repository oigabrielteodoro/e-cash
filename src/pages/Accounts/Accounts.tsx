import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineBarChart, AiOutlineMore } from 'react-icons/ai'

import { AppLayout, Button, Calendar, Row, Grid, Space, Tooltip } from 'ui'

export function Accounts() {
  return (
    <AppLayout>
      <AppLayout.Header title='Accounts'>
        <Row as='section' alignItems='center'>
          <Space marginRight='2.4rem'>
            <Calendar />
          </Space>

          <Grid columns={3} gutter={[8, 0]}>
            <Tooltip message='New account' position='bottom'>
              <Button variant='icon'>
                <FiPlus />
              </Button>
            </Tooltip>
            <Tooltip message='Balance projection' position='bottom'>
              <Button variant='icon'>
                <AiOutlineBarChart />
              </Button>
            </Tooltip>
            <Tooltip message='More' position='bottom'>
              <Button variant='icon'>
                <AiOutlineMore />
              </Button>
            </Tooltip>
          </Grid>
        </Row>
      </AppLayout.Header>
    </AppLayout>
  )
}
