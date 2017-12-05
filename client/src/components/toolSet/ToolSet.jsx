import React, { Component } from 'react';
import ShowResolvedCommentToggle from './ShowResolvedCommentsToggle';
import FocusModeToggle from './FocusModeToggle';

class ToolSet extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="ToolSet fixed-action-btn">
            <a className="btn-floating btn-large light-blue lighten-1">
                <i className="large material-icons">more_vert</i>
            </a>
            <ul>
                <li><ShowResolvedCommentToggle /></li>
                <li><FocusModeToggle /></li>
                {/* TODO: Add more functionality to the toolset. If there is only one funcionality, replace the toolset button. */}
            </ul>
        </div>
    );
  }
}

export default ToolSet;