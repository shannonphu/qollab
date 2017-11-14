import React, { Component } from 'react'

import Nav from './Nav';
import Canvas from './Canvas';
import CommentList from './comments/CommentList';
import ToolSet from './ToolSet';

require('./styles/lecture.css');

class LecturePortal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			joinCode: this.props.match.params.joinCode
		}
	}

	render() {
		let comments = [
			{
				text: "Question",
				replies: [ "Reply 1", "Reply 2", "Reply 3" ],
				votes: 5,
				resolved: false
			},
			{
				text: "Question 2",
				replies: [ "Reply 1", "Reply 2", "Reply 3" ],
				votes: 5,
				resolved: false
			},
			{
				text: "Question 3",
				replies: [ "Reply 1", "Reply 2", "Reply 3" ],
				votes: 5,
				resolved: false
			},
			{
				text: "Question 4",
				replies: [ "Reply 1", "Reply 2", "Reply 3" ],
				votes: 5,
				resolved: false
			},
		];

		return (
			<div className='LecturePortal'>
				<Nav title="Lecture Title Placeholder" />
				<ToolSet />
				<div className="row lecture-container">
					<div className="col s6 m8"><Canvas joinCode={this.state.joinCode} /></div>
					<div className="col s6 m4"><CommentList comments={comments} /></div>
				</div>
			</div>
		)
	}
}

export default LecturePortal