import React, { Component } from 'react'

import Canvas from './Canvas';
import CommentList from './comments/CommentList';
import ToolSet from './ToolSet';

require('./styles/lecture.css');

/**
 * LecturePortal component, including the Canvas and the comment list.
 * @class
 * @extends Component
 */
class LecturePortal extends Component {
	/**
	 * Creates a new LecturePortal
	 * @constructor
	 * @param {PropTypes.Object} props 
	 */
	constructor(props) {
		super(props)
		this.state = {
			joinCode: this.props.match.params.joinCode
		}
	}

	/**
	 * Renders the lecture portal
	 * @function
	 */
	render() {
		return (
			<div className='LecturePortal row'>
				<ToolSet />
				<div className="row lecture-container">
					<div className="col s6 m8"><Canvas joinCode={this.state.joinCode} /></div>
					<div className="col s6 m4"><CommentList joinCode={this.state.joinCode} /></div>
				</div>
			</div>
		)
	}
}

export default LecturePortal