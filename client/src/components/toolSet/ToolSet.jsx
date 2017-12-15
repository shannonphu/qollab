import React, { Component } from 'react';
import ShowResolvedCommentToggle from './ShowResolvedCommentsToggle';
import FocusModeToggle from './FocusModeToggle';
import AddCommentToggle from './AddCommentToggle';

/**
 * ToolSet component
 */
class ToolSet extends Component {

    /**
     * @constructor
     * @param {Object} props 
     */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="ToolSet fixed-action-btn">
            <a className="btn-floating btn-medium teal">
                <i className="material-icons">more_vert</i>
            </a>
            <ul>
                <li><ShowResolvedCommentToggle /></li>
                <li><FocusModeToggle /></li>
                <li><AddCommentToggle /></li>
                {/* TODO: Add more functionality to the toolset. If there is only one funcionality, replace the toolset button. */}
            </ul>
        </div>
    );
  }
}

export default ToolSet;