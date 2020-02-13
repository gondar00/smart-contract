import { drizzleConnect } from '@drizzle/react-plugin'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContractData extends Component {
  constructor (props, context) {
    super(props)

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : []

    this.contracts = context.drizzle.contracts
    this.state = {
      dataKey: this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheCall(...methodArgs)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { methodArgs, contract, method } = this.props

    const didContractChange = contract !== nextProps.contract
    const didMethodChange = method !== nextProps.method
    const didArgsChange =
      JSON.stringify(methodArgs) !== JSON.stringify(nextProps.methodArgs)

    if (didContractChange || didMethodChange || didArgsChange) {
      this.setState({
        dataKey: this.contracts[nextProps.contract].methods[
          nextProps.method
        ].cacheCall(...nextProps.methodArgs)
      })
    }
  }

  getDisplayData (key, value, spinner) {
    return (
      <tr>
        <td>{key} {spinner}</td>
        <td>{`${value}`}</td>
      </tr>
    )
  }

  render () {
    // Contract is not yet intialized.
    if (!this.props.contracts[this.props.contract].initialized) {
      return <div uk-spinner='ratio: 3' />
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.state.dataKey in
        this.props.contracts[this.props.contract][this.props.method]
      )
    ) {
      return <div uk-spinner='ratio: 3' />
    }

    // Show a loading spinner for future updates.
    // Optionally hide loading spinner (EX: ERC20 token symbol).

    var pendingSpinner = this.props.contracts[this.props.contract].synced || this.props.hideIndicator
      ? ''
      : <div uk-spinner />

    var displayData = this.props.contracts[this.props.contract][
      this.props.method
    ][this.state.dataKey].value

    // Optionally convert to UTF8
    if (this.props.toUtf8) {
      displayData = this.context.drizzle.web3.utils.hexToUtf8(displayData)
    }

    // Optionally convert to Ascii
    if (this.props.toAscii) {
      displayData = this.context.drizzle.web3.utils.hexToAscii(displayData)
    }

    // If a render prop is given, have displayData rendered from that component
    if (this.props.render) {
      return this.props.render(displayData)
    }

    // If return value is an array
    if (Array.isArray(displayData)) {
      const displayListItems = displayData.map((datum, index) => {
        return (
          <li key={index}>
            {`${datum}`}
            {pendingSpinner}
          </li>
        )
      })

      return <ul>{displayListItems}</ul>
    }

    // If retun value is an object
    if (typeof displayData === 'object') {
      console.log(displayData)
      var i = 0
      const displayObjectProps = []

      Object.keys(displayData).forEach(key => {
        if (i != key) {
          displayObjectProps.push(this.getDisplayData(key, displayData[key], pendingSpinner))
        }
        i++
      })

      return (
        <table className='uk-table uk-table-small uk-table-divider'>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {displayObjectProps}
          </tbody>
        </table>
      )
    }

    return (
      <span>
        {`${displayData}`}
        {pendingSpinner}
      </span>
    )
  }
}

ContractData.contextTypes = {
  drizzle: PropTypes.object
}

ContractData.propTypes = {
  contracts: PropTypes.object.isRequired,
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  methodArgs: PropTypes.array,
  hideIndicator: PropTypes.bool,
  toUtf8: PropTypes.bool,
  toAscii: PropTypes.bool,
  render: PropTypes.func
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(ContractData, mapStateToProps)
