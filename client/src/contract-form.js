import { drizzleConnect } from '@drizzle/react-plugin'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const translateType = type => {
  switch (true) {
    case /^uint/.test(type):
      return 'number'
    case /^string/.test(type) || /^bytes/.test(type):
      return 'text'
    case /^bool/.test(type):
      return 'checkbox'
    default:
      return 'text'
  }
}

class ContractForm extends Component {
  constructor (props, context) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.contracts = context.drizzle.contracts
    this.utils = context.drizzle.web3.utils

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi

    this.inputs = []
    var initialState = {}

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs

        for (var j = 0; j < this.inputs.length; j++) {
          initialState[this.inputs[j].name] = this.inputs[j].type === 'bool' ? false : ''
        }

        break
      }
    }

    this.state = initialState
  }

  handleSubmit (event) {
    event.preventDefault()

    const inputs = this.inputs.map(input => this.state[input.name])

    const empty = (element) => typeof element === 'string' && element.trim() === ''

    if (inputs.some(empty)) {
      this.setState({
        pristine: true
      })

      return
    }

    const convertedInputs = this.inputs.map(input => {
      if (input.type === 'bytes32') {
        return this.utils.toHex(this.state[input.name])
      }
      return this.state[input.name]
    })

    if (this.props.sendArgs) {
      return this.contracts[this.props.contract].methods[
        this.props.method
      ].cacheSend(...convertedInputs, this.props.sendArgs)
    }

    return this.contracts[this.props.contract].methods[
      this.props.method
    ].cacheSend(...convertedInputs)
  }

  handleInputChange (event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    this.setState({ [event.target.name]: value, pristine: false })
  }

  render () {
    if (this.props.render) {
      return this.props.render({
        inputs: this.inputs,
        inputTypes: this.inputs.map(input => translateType(input.type)),
        state: this.state,
        handleInputChange: this.handleInputChange,
        handleSubmit: this.handleSubmit
      })
    }

    return (
      <form className='uk-form-stacked' onSubmit={this.handleSubmit}>
        <fieldset className='uk-fieldset'>
          {this.inputs.map((input, index) => {
            var inputType = translateType(input.type)
            var inputLabel = this.props.labels
              ? this.props.labels[index]
              : input.name

            return (
              <div key={input.name} className='uk-margin'>
                <label className='uk-form-label' htmlFor='form-stacked-text'>{inputLabel}</label>
                <div className='uk-form-controls'>
                  {inputType === 'checkbox' ? (
                    <input
                      name={input.name}
                      onChange={this.handleInputChange}
                      className='uk-checkbox'
                      type={inputType}
                      // checked={this.state[input.name]}
                    />
                  ) : (
                    <input
                      name={input.name}
                      value={this.state[input.name]}
                      onChange={this.handleInputChange}
                      className={`${this.state.pristine ? 'uk-form-danger' : ''} uk-input`}
                      type={inputType}
                      placeholder={input.name}
                    />
                  )}
                </div>
              </div>
            )
          })}
          <button key='submit' type='button' className='uk-margin-top uk-margin-left uk-margin-bottom uk-position-bottom uk-button uk-button-default' onClick={this.handleSubmit}>
            Add
          </button>
        </fieldset>
      </form>
    )
  }
}

ContractForm.contextTypes = {
  drizzle: PropTypes.object
}

ContractForm.propTypes = {
  contract: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  sendArgs: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.string),
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

export default drizzleConnect(ContractForm, mapStateToProps)
