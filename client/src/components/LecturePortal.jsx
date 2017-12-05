import React, { Component } from 'react'
import { connect } from 'react-redux';

import Canvas from './Canvas';
import CommentList from './comments/CommentList';
import ToolSet from './toolSet/ToolSet';
import * as realtimeActions from '../actions/realtime';

require('./styles/lecture.css');

class LecturePortal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			joinCode: this.props.match.params.joinCode
		}
		this.setCanvasRef = this.setCanvasRef.bind(this);
		this.setCommentListRef = this.setCommentListRef.bind(this);
	}

	componentWillMount() {
		document.addEventListener('click', this.onClickHandler, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.onClickHandler, false);
	}

	onClickHandler(event) {
		if (this.canvasRef && !this.canvasRef.contains(event.target)
			&& this.commentListRef && !this.commentListRef.contains(event.target)) {
			this.props.unhighlightAllRects();
		}
	}

	setCanvasRef(node) {
		this.canvasRef = node;
	}

	setCommentListRef(node) {
		this.commentListRef = node;
	}

	render() {
		return (
			<div className='LecturePortal row'>
				<ToolSet />
				<div className="row lecture-container">
					<div className="col s6 m8"><Canvas ref={this.setCanvasRef} joinCode={this.state.joinCode} /></div>
					<div className="col s6 m4"><CommentList ref={this.setCommentListRef} joinCode={this.state.joinCode} /></div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		unhighlightAllRects: () => dispatch(realtimeActions.unhighlightAllRects())
	}
};

export default connect(mapDispatchToProps)(LecturePortal);