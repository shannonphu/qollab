import React, {Component} from 'react'
// import { Route, Redirect, Switch, Link } from 'react-router-dom'

import Nav from './components/Nav';
import CanvasContainer from './components/CanvasContainer';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='App'>
          <Nav title="Lecture Title Placeholder" />
          {<CanvasContainer />}
      </div>
    )
  }
}

export default App