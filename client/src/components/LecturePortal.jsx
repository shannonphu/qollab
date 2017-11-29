import React, { Component } from 'react'

import Canvas from './Canvas';
import CommentList from './comments/CommentList';
import ToolSet from './toolSet/ToolSet';

require('./styles/lecture.css');

class LecturePortal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			joinCode: this.props.match.params.joinCode
		}
	}

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