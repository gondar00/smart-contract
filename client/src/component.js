import React from 'react'
import {
  AccountData,
  ContractData,
  ContractForm
} from '@drizzle/react-components'

const methods = {
  addStatusType: 'addStatusType',
  changeState: 'changeState',
  addStatus: 'addStatus'
}

export default ({ accounts }) => (
  <div className='App'>
    <div className='section'>
      <h2>Active account</h2>
      <AccountData accountIndex={0} precision={3} />
    </div>

    <div className='section'>
      <p>
        <strong>Jur status(s): </strong>
        <ContractData
          contract='JurStatus'
          method='status'
          methodArgs={[accounts[0]]}
        />
      </p>
      <br />
      <p>
        <strong>Add status type: </strong>
        <ContractForm contract='JurStatus' method={methods.addStatusType} />
      </p>
      <br />

      <p>
        <strong>Change state: </strong>
        <ContractForm contract='JurStatus' method={methods.changeState} />
      </p>
      <br />

      <p>
        <strong>Add status(s): </strong>
        <ContractForm contract='JurStatus' method={methods.addStatus} />
      </p>
    </div>
  </div>
)
