import React, {Component} from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='App container'>
          <p>Hello, world</p>
      </div>
    )
  }
}

export default App