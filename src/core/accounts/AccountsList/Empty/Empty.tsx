import React from 'react'

import { Button, EmptyState, Space } from 'ui'

type Props = {
  onOpenCreateAccountDrawer: () => void
}

export function Empty({ onOpenCreateAccountDrawer }: Props) {
  return (
    <EmptyState
      size='lg'
      title='No bank account found!'
      description="We couldn't find any bank accounts, try to add one first"
    >
      <Space margin='0 auto'>
        <Button full={false} onClick={onOpenCreateAccountDrawer}>
          Add bank account
        </Button>
      </Space>
    </EmptyState>
  )
}
