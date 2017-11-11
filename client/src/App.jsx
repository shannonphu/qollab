import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Nav from './components/Nav';
import LecturePortal from './components/LecturePortal';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='App'>
        <Nav title="Lecture Title Placeholder" />

        <Switch>
          <Route path='/lecture/:joinCode' component={LecturePortal} />
        </Switch>
      </div>
    )
  }
}

export default App