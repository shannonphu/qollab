import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Nav from './components/Nav';
import LecturePortal from './components/LecturePortal';
import JoinLectureForm from './components/JoinLectureForm';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='App'>
        <Nav title="Lecture Title Placeholder" />
        <div className="container">
          <Switch>
            <Route path='/lecture/:joinCode' component={LecturePortal} />
            <Route path='/join' component={JoinLectureForm} />
            <Redirect to='/' />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App