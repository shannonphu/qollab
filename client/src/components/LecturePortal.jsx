import React, { Component } from 'react'

import Canvas from './Canvas';

class LecturePortal extends Component {
  constructor(props) {
    super(props)
    this.state = {
        joinCode: this.props.match.params.joinCode
    }
  }

  render() {
    return (
      <div className='LecturePortal'>
        <div className="col m8"><Canvas joinCode={this.state.joinCode} /></div>
        <div className="col m4"></div>
      </div>
    )
  }
}

export default LecturePortal