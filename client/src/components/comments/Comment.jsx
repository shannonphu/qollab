import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import $ from 'jquery'; 

import CommentReplyList from './CommentReplyList';
import * as realtimeActions from '../../actions/realtime';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upVoteHandler = this.upVoteHandler.bind(this);
        this.resolveHandler = this.resolveHandler.bind(this);
    }

    componentDidMount() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    }

    componentDidUpdate() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);        
    }
    
    upVoteHandler() {
        this.props.upVoteComment(this.props.id);
    }

    resolveHandler() {
        this.props.resolveComment(this.props.id);
    }

    render() {
        if (this.props.resolved && !this.props.showResolvedCommentsToggled) {
            return (null);
        } else {

            const resolveButton = this.props.resolved ? <span>RESOLVED</span> : (
                <a onMouseDown={this.resolveHandler} >
                    <i className="material-icons not-collapse">check</i>
                </a>
            );

            return (
                <li className="Comment">
                    <div className={this.props.className}>
                        <ul style={{ "width": "100%" }}>
                            <li>
                                <i className="material-icons">chat_bubble</i>
                                <span>{this.props.text}</span>
                            </li>
                            <li ref="disableTextSelect">
                                <div className="left">
                                    <a onMouseDown={this.upVoteHandler} >
                                        <i className="material-icons not-collapse">thumb_up</i>
                                    </a>
                                    <strong>{this.props.votes}</strong>
                                </div>
                                <div className="right">
                                    {resolveButton}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <CommentReplyList replies={this.props.replies} commentId={this.props.id} />
                </li>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        showResolvedCommentsToggled: state.commentsReducer.showResolvedCommentsToggled
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVoteComment: id => dispatch(realtimeActions.upVoteComment(id)),
        resolveComment: id => dispatch(realtimeActions.resolveComment(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);