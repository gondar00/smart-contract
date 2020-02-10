import React from 'react'
import { drizzleReactHooks } from 'drizzle-react'
import ReadStatus from './components/ReadStatus'

export default () => {
  const { useCacheCall } = drizzleReactHooks.useDrizzle()
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }))
  return (
    <ReadStatus
      drizzleState={drizzleState}
      statusCount={useCacheCall('JurStatus', 'statusCount', drizzleState.account)}
    />
  )
}
