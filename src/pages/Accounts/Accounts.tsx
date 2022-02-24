import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineBarChart, AiOutlineMore } from 'react-icons/ai'

import { NUBANK } from 'assets'
import { AppLayout, Button, Calendar, Row, Grid, Space, Tooltip, Col } from 'ui'

import { BalanceCard } from 'pages/Dashboard/BalanceCard'

import * as S from './Accounts.styled'

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
      <AppLayout.Content>
        <Row gutter={[32, 0]}>
          <Col span={18}>
            <Row as='ul' gutter={[32, 32]}>
              {[1, 2, 3, 4].map((account) => (
                <Col as='li' key={account} span={12}>
                  <S.AccountBankCard>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <S.AccountBankFlagBox>
                            <S.AccountBankFlagImg src={NUBANK} alt='Nubank' />
                            <S.AccountBankInfoBox>
                              <h3>Conta Principal</h3>
                              <small>NU PAGAMENTOS S.A</small>
                            </S.AccountBankInfoBox>
                            <S.Separator />
                            <S.AccountBankInfo>
                              <span>
                                Ag. <strong>0001</strong>
                              </span>
                              <span>
                                Conta. <strong>17089-1</strong>
                              </span>
                            </S.AccountBankInfo>
                          </S.AccountBankFlagBox>

                          <S.AccountBankBalanceBox>
                            <S.AccountBankBalance>
                              R$ 10,000.00
                            </S.AccountBankBalance>
                            <span>+30% since last month</span>
                          </S.AccountBankBalanceBox>
                        </Row>
                      </Col>
                    </Row>
                  </S.AccountBankCard>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={6}>
            <Grid columns={1} gutter={[0, 32]}>
              <BalanceCard
                title='Current balance'
                currentValue={10000}
                previousValue={7000}
                icon={AiOutlineBank}
              />
              <BalanceCard
                title='Balance projection'
                currentValue={10000}
                previousValue={7000}
                icon={AiOutlineBank}
              />
            </Grid>
          </Col>
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
