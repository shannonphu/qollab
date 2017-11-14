import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LecturePortal from './components/LecturePortal';
import JoinLectureForm from './components/JoinLectureForm';
import CreateLectureForm from './components/CreateLectureForm';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/lecture/create' component={CreateLectureForm} />
          <Route path='/lecture/:joinCode' component={LecturePortal} />
          <Route path='/join' component={JoinLectureForm} />
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}

export default App