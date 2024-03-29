import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import CommentReplyList from './CommentReplyList';
import * as commentsActions from '../../actions/comments';
import * as realtimeActions from '../../actions/realtime';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upVoteHandler = this.upVoteHandler.bind(this);
        this.resolveHandler = this.resolveHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onMountAndUpdate = this.onMountAndUpdate.bind(this);
    }

    onMountAndUpdate() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
        // Disable collapsibility for certain elements
        $(".not-collapse").click(function (e) {
            e.stopPropagation();
        });
    }

    componentDidMount() {
        this.onMountAndUpdate();
    }

    componentDidUpdate() {
        this.onMountAndUpdate();
    }

    onClickHandler(event) {
        this.props.unhighlightAllRects();
        if (this.props.annotation) {
            let annotationID = this.props.annotation._id;
            this.props.highlightRect(annotationID);
        }
    }

    upVoteHandler() {
        // Store upvote to DB
        axios.post('http://localhost:3005/comment/upvote', {
            commentID: this.props.id
        })
            .then(() => {
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
        axios.post('http://localhost:3005/comment/resolve', {
            commentID: this.props.id
        })
            .then(() => {
                this.props.resolveComment(this.props.id);
                this.props.syncResolveComment(this.props.id, this.props.lectureCode);
                if (this.props.annotation) {
                    this.props.removeRectFromCanvas(this.props.annotation._id);
                    this.props.syncRemoveRectFromCanvas(this.props.annotation._id);

                    let canvasJSON = this.props.canvas.toJSON();
                    axios.post('http://localhost:3005/canvas/set', {
                        joinCode: this.props.lectureCode,
                        canvasJSON: JSON.stringify(canvasJSON)
                    }, {
                            withCredentials: true
                        })
                        .then(() => {
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        if (this.props.resolved && !this.props.showResolvedCommentsToggled) {
            return (null);
        } else {

            const resolveButton = this.props.resolved ? <span>RESOLVED</span> : (
                this.props.isInstructor || !this.props.lecture.instructor ? 
                <a onMouseDown={this.resolveHandler} >
                    <i className="material-icons not-collapse">check</i>
                </a> : (null)
            );

            return (
                <li className="Comment" onClick={this.onClickHandler}>
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
        showResolvedCommentsToggled: state.commentsReducer.showResolvedCommentsToggled,
        canvas: state.realtimeReducer.canvas,
        isInstructor: state.realtimeReducer.isInstructor,
        lecture: state.lectureReducer.lecture
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVoteComment: (commentID, joinCode) => dispatch(commentsActions.upVoteComment(commentID, joinCode)),
        resolveComment: id => dispatch(commentsActions.resolveComment(id)),
        highlightRect: (annotationId) => dispatch(realtimeActions.highlightRect(annotationId)),
        unhighlightAllRects: () => dispatch(realtimeActions.unhighlightAllRects()),
        removeRectFromCanvas: (id) => dispatch(realtimeActions.removeRectFromCanvas(id)),
        syncUpvote: (commentID, joinCode) => dispatch({
            type: "socket/COMMENT_UPVOTED",
            data: {
                commentID: commentID,
                joinCode: joinCode
            }
        }),
        syncResolveComment: (commentID, joinCode) => dispatch({
            type: "socket/COMMENT_RESOLVED",
            data: {
                commentID: commentID,
                joinCode: joinCode
            }
        }),
        syncRemoveRectFromCanvas: (annotationID) => dispatch({
            type: "socket/ANNOTATION_RESOLVED",
            data: {
                annotationID: annotationID
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);