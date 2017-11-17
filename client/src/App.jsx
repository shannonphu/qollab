import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Nav from './components/Nav';
import LecturePortal from './components/LecturePortal';
import JoinLectureForm from './components/JoinLectureForm';
import CreateLectureForm from './components/CreateLectureForm';

/**
 * The root component dealign with URL routing
 * @class
 * @augments Component
 */
class App extends Component {
  /**
   * Creates a new App object
   * @param {PropTypes.Object} props 
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * @function
   */
  render() {
    return (
      <div className='App'>
        <Nav title="Lecture Title Placeholder" />
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