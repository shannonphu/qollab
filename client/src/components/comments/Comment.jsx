import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

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
        // Store upvote to DB
        axios.post('http://localhost:3005/comment/upvote', {
            commentID: this.props.id
        })
            .then((response) => {
                let comment = response.data

                // Increases vote count for this client's comment UI
                this.props.upVoteComment(this.props.id, this.props.lectureCode);

                // Sends event to socket server to sync across all clients
                this.props.syncUpvote(this.props.id, this.props.lectureCode);
            })
            .catch((error) => {
                throw error;
            });
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

                    <CommentReplyList replies={this.props.replies} commentId={this.props.id} lectureCode={this.props.lectureCode} />
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
        upVoteComment: (commentID, joinCode) => dispatch(realtimeActions.upVoteComment(commentID, joinCode)),
        resolveComment: id => dispatch(realtimeActions.resolveComment(id)),
        syncUpvote: (commentID, joinCode) => dispatch({
            type: "socket/COMMENT_UPVOTED",
            data: {
                commentID: commentID,
                joinCode: joinCode
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);