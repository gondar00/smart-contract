import Component from './component'
import { drizzleConnect } from '@drizzle/react-plugin'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    JurStatus: state.contracts.JurStatus,
    drizzleStatus: state.drizzleStatus
  }
}

const Container = drizzleConnect(Component, mapStateToProps)

export default Container
