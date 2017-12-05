import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as realtimeActions from '../../actions/realtime';
import * as commentsActions from '../../actions/comments';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitHandler = this.submitHandler.bind(this);
        this.annotationCheckboxToggled = this.annotationCheckboxToggled.bind(this);
    }

    submitHandler(event) {
        event.preventDefault();

        let newCommentText = this.refs.text.value;
        let commentAnnotation = this.props.activeAnnotation;
        this.store(newCommentText, commentAnnotation);

        this.props.setCommentFormShown(false);

        this.props.activateCanvasDrawingMode();

        // Clear textbox and checkbox
        this.refs.text.value = null;
        this.refs.annotationWanted.checked = false;
    }

    annotationCheckboxToggled(event) {
        if (event.target.checked) {
            this.props.deactivateCanvasDrawingMode();            
            this.props.addRectToCanvas();
        } else {
            this.props.removeRectFromCanvas(this.props.activeAnnotation._id);
            this.props.activateCanvasDrawingMode();
        }
    }

    store(commentText, commentAnnotation) {
        axios.post('http://localhost:3005/comment/create', {
            joinCode: this.props.lectureCode,
            text: commentText,
            annotation: commentAnnotation
        })
            .then((response) => {
                let newComment = response.data;
                this.props.addCommentToList(newComment);
                this.props.syncNewComment(newComment, this.props.lectureCode);
                this.props.freezeCanvasObjects();      
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        if (!this.props.commentFormShown) {
            return(null);
        } else {
            return (
                <li className="CommentForm">
                    <div className={this.props.className}>
                        <form onSubmit={this.submitHandler} style={{ "width": "100%" }}>
                            <div className="row">
                                <input type="checkbox" className="filled-in" id="annotationWanted" ref="annotationWanted" onChange={this.annotationCheckboxToggled} />
                                <label htmlFor="annotationWanted">Add Annotation</label>
                            </div>
                            <div className="row input-field">
                                <input id="add_comment" type="text" ref="text"  autoComplete="off" className="materialize-textarea"/>
                                <label htmlFor="add_comment">Write a comment...</label>
                            </div>
                            <div className="row">
                                <button className="btn-small btn waves-effect waves-light" type="submit" name="action">Submit</button>
                            </div>
                        </form>
                    </div>
                </li>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        activeAnnotation: state.realtimeReducer.activeAnnotation,
        commentFormShown: state.commentsReducer.commentFormShown
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRectToCanvas: () => dispatch(realtimeActions.addRectToCanvas()),
        activateCanvasDrawingMode: () => dispatch(realtimeActions.activateCanvasDrawingMode()),
        deactivateCanvasDrawingMode: () => dispatch(realtimeActions.deactivateCanvasDrawingMode()),
        removeRectFromCanvas: id => dispatch(realtimeActions.removeRectFromCanvas(id)),
        freezeCanvasObjects: () => dispatch(realtimeActions.freezeCanvasObjects()),
        addCommentToList: comment => dispatch(commentsActions.addComment(comment)),
        setCommentFormShown: (isShown) => dispatch(commentsActions.setCommentFormShown(isShown)),
        syncNewComment: (comment, joinCode) => dispatch({
            type: "socket/COMMENT_ADDED",
            data: {
                comment: comment,
                joinCode: joinCode
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);