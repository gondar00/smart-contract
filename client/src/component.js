import React from 'react'
import {
  ContractData,
  ContractForm
} from '@drizzle/react-components'

import AccountData from './account-data'

const methods = {
  addStatusType: 'addStatusType',
  changeState: 'changeState',
  addStatus: 'addStatus'
}

export default ({ accounts }) => (
  <div className='app'>
    <AccountData accountIndex={0} precision={3} />
    <div className='uk-flex uk-flex-center' uk-sortable='handle: .uk-card'>
      <div className='uk-card uk-card-default uk-card-large  uk-card-body uk-margin-left'>
        {/* <AccountData accountIndex={0} precision={3} /> */}
      </div>
      <div className='uk-card uk-card-default uk-card-large  uk-card-body uk-margin-left'>Item 2</div>
      <div className='uk-card uk-card-default uk-card-large  uk-card-body uk-margin-left'>Item 3</div>
    </div>
    {/* <div className='section'>
      <AccountData accountIndex={0} precision={3} />
    </div> */}
    {/*
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
    </div> */}
  </div>
)
