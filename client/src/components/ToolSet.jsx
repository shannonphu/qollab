import React, { Component } from 'react';

/**
 * Toolset component including deleting or editing on Canvas.
 * @class
 * @augments Component
 */
class ToolSet extends Component {

    /**
     * Creates a new ToolSet object
     * @constructor
     * @param {Object} props 
     */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Renders the ToolSet
   * @function
   */
  render() {
    return (
        <div className="ToolSet fixed-action-btn">
            <a className="btn-floating btn-large light-blue lighten-1">
                <i className="large material-icons">more_vert</i>
            </a>
            <ul>
                <li><a className="btn-floating orange"><i className="material-icons">lock_open</i></a></li>
                <li><a className="btn-floating red"><i className="material-icons">delete</i></a></li>
                <li><a className="btn-floating green"><i className="material-icons">edit</i></a></li>
            </ul>
        </div>
    );
  }
}

export default ToolSet;