import React, { Component } from 'react'
import { DrizzleProvider } from '@drizzle/react-plugin'
import { LoadingContainer } from '@drizzle/react-components'

import './app.css'

import drizzleOptions from './drizzle-options'
import Container from './container'

class App extends Component {
  render () {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Container />
        </LoadingContainer>
      </DrizzleProvider>
    )
  }
}

export default App
