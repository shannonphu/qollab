import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Nav from './components/Nav';
import LecturePortal from './components/LecturePortal';
import InstructorDashboard from './components/InstructorDashboard';
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
        <Nav />
        <Switch>        
          <Route exact path='/lecture/create' component={CreateLectureForm} />
          <Route path='/lecture/:joinCode' component={LecturePortal} />
          <Route path='/dashboard' component={InstructorDashboard} />
          <Route path='/' component={JoinLectureForm} />
          <Route path='/join' component={JoinLectureForm} />  
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}

export default App