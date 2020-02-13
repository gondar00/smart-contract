import React from 'react'
import AccountData from './account-data'
import ContractData from './contract-data'
import ContractForm from './contract-form'

const contract = 'JurStatus'
const methods = {
  status: 'status',
  addStatusType: 'addStatusType',
  changeState: 'changeState',
  addStatus: 'addStatus'
}

export default ({ accounts }) => (
  <div className='app'>
    <AccountData accountIndex={0} precision={3} />
    <div className='uk-flex uk-flex-center' uk-sortable='handle: .uk-card'>
      <div className='uk-card uk-card-default uk-card-hover uk-card-medium uk-card-body uk-margin-left uk-animation-slide-bottom'>
        <h5>STATUS</h5>
        <ContractData
          contract={contract}
          method={methods.status}
          methodArgs={[accounts[0]]}
        />
      </div>
      <div className='uk-card uk-card-default uk-card-hover uk-card-medium uk-card-body uk-margin-left uk-animation-slide-bottom'>
        <h5>ADD - STATUS TYPE</h5>
        <ContractForm contract={contract} method={methods.addStatusType} />
      </div>
      <div className='uk-card uk-card-default uk-card-hover uk-card-medium uk-card-body uk-margin-left uk-animation-slide-bottom'>
        <h5>ADD - STATUS</h5>
        <ContractForm contract={contract} method={methods.addStatus} />
      </div>
      <div className='uk-card uk-card-default uk-card-hover uk-card-medium uk-card-body uk-margin-left uk-animation-slide-bottom'>
        <h5>CHANGE - STATE</h5>
        <ContractForm contract={contract} method={methods.changeState} />
      </div>
    </div>
  </div>
)
