import { drizzleConnect } from '@drizzle/react-plugin'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AccountData extends Component {
  precisionRound = (number, precision) => {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  render () {
    // No accounts found.
    if (Object.keys(this.props.accounts).length === 0) {
      return <div uk-spinner="ratio: 3"></div>
    }

    // Get account address and balance.
    const address = this.props.accounts[this.props.accountIndex]
    var balance = this.props.accountBalances[address]
    const units = this.props.units
      ? this.props.units.charAt(0).toUpperCase() + this.props.units.slice(1)
      : 'Wei'

    // Convert to given units.
    if (this.props.units && typeof balance !== 'undefined') {
      balance = this.context.drizzle.web3.utils.fromWei(
        balance,
        this.props.units
      )
    }

    // Adjust to given precision.
    if (this.props.precision) {
      balance = this.precisionRound(balance, this.props.precision)
    }

    if (this.props.render) {
      return this.props.render({
        address,
        balance,
        units
      })
    }

    return (
      <div className='uk-flex uk-flex-center uk-margin-bottom'>
      <div className='uk-card uk-animation-slide-top uk-card-default uk-card-body uk-width-1-2@m'>
        <h3 className='uk-card-title'>Account</h3>
        <sub>{address}</sub>
        <p>{balance} <a href="#">{units}</a></p>
      </div>
      </div>
    )
  }
}

AccountData.contextTypes = {
  drizzle: PropTypes.object
}

AccountData.propTypes = {
  accounts: PropTypes.objectOf(PropTypes.string),
  accountBalances: PropTypes.objectOf(PropTypes.string),
  accountIndex: PropTypes.number.isRequired,
  units: PropTypes.string,
  precision: PropTypes.number,
  render: PropTypes.func
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    accountBalances: state.accountBalances
  }
}

export default drizzleConnect(AccountData, mapStateToProps)
