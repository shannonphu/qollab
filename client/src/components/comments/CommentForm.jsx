import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import $ from 'jquery';

import * as realtimeActions from '../../actions/realtime';
import * as commentsActions from '../../actions/comments';

/**
 *  CommentForm 
 */
class CommentForm extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.submitHandler = this.submitHandler.bind(this);
        this.annotationCheckboxToggled = this.annotationCheckboxToggled.bind(this);
        this.onMountAndUpdate = this.onMountAndUpdate.bind(this);
    }

    onMountAndUpdate() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
        // Disable collapsibility
        $(".CommentForm").click(function (e) {
            e.stopPropagation();
        });
    }

    componentDidMount() {
        this.onMountAndUpdate();
    }

    componentDidUpdate() {
        this.onMountAndUpdate();
    }

    /**
     * @summary handles the submit comment action
     * @param {*} event the submit event
     */
    submitHandler(event) {
        event.preventDefault();

        let newCommentText = this.refs.text.value;
        if (newCommentText.length > 0) {
            let commentAnnotation = this.props.activeAnnotation;
            this.store(newCommentText, commentAnnotation);

            this.props.setCommentFormShown(false);

            if (this.props.user && this.props.user._id === this.props.lecture.instructor) {
              this.props.activateCanvasDrawingMode();
            }

            // Clear textbox and checkbox
            this.refs.text.value = null;
            this.props.setAnnotationCheckbox(false);
        }
    }

    /**
     * @summary handles the action of toggling the check box of annotation
     */
    annotationCheckboxToggled() {
        const isChecked = this.props.annotationCheckbox;
        if (!isChecked) {
            this.props.deactivateCanvasDrawingMode();
            this.props.addRectToCanvas();
        } else {
            this.props.removeRectFromCanvas(this.props.activeAnnotation._id);
            this.props.activateCanvasDrawingMode();
        }
        this.props.setAnnotationCheckbox(!isChecked);
    }

    /**
     * @summary stores the comment with text and annotation
     * @param {String} commentText the text of the comment
     * @param {String} commentAnnotation the annotation associated with the commment
     */
    store(commentText, commentAnnotation) {
        this.props.unhighlightAllRects();
        this.props.freezeCanvasObjects();
        let canvasJSON = this.props.canvas.toJSON();
        this.props.canvasUpdated(canvasJSON, this.props.lectureCode);

        axios.post('http://localhost:3005/comment/create', {
            joinCode: this.props.lectureCode,
            text: commentText,
            annotation: commentAnnotation
        })
            .then((response) => {
                let newComment = response.data;
                this.props.addCommentToList(newComment);
                this.props.syncNewComment(newComment, this.props.lectureCode);
            })
            .catch((error) => {
                throw error;
            });

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

    /**
     * @returns the html for rendering
     */
    render() {
        const checkbox = this.props.annotationCheckbox ? <i className="material-icons">check_box</i> : <i className="material-icons">check_box_outline_blank</i>;

        if (!this.props.commentFormShown) {
            return (null);
        } else {
            return (
                <li className="CommentForm">
                    <div className={this.props.className} ref="disableTextSelect">
                        <form onSubmit={this.submitHandler} style={{ "width": "100%" }}>
                            <div className="row">
                                <a onMouseDown={this.annotationCheckboxToggled} >
                                    {checkbox}
                                </a>
                                <label>Add Annotation</label>
                            </div>
                            <div className="row input-field">
                                <input id="add_comment" type="text" ref="text" autoComplete="off" className="materialize-textarea validate" />
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

/**
 * get redux source's state and map it to component props
 * @param {*} state 
 * @returns the props
 */
function mapStateToProps(state) {
    return {
        activeAnnotation: state.realtimeReducer.activeAnnotation,
        commentFormShown: state.commentsReducer.commentFormShown,
        annotationCheckbox: state.commentsReducer.annotationCheckbox,
        canvas: state.realtimeReducer.canvas,
        user: state.userReducer.user,
        lecture: state.lectureReducer.lecture
    }
}

/**
 * maps the dispatch to props
 * @param {*} dispatch 
 * @returns the props
 */
const mapDispatchToProps = (dispatch) => {
    return {
        addRectToCanvas: () => dispatch(realtimeActions.addRectToCanvas()),
        activateCanvasDrawingMode: () => dispatch(realtimeActions.activateCanvasDrawingMode()),
        deactivateCanvasDrawingMode: () => dispatch(realtimeActions.deactivateCanvasDrawingMode()),
        removeRectFromCanvas: id => dispatch(realtimeActions.removeRectFromCanvas(id)),
        freezeCanvasObjects: () => dispatch(realtimeActions.freezeCanvasObjects()),
        unhighlightAllRects: () => dispatch(realtimeActions.unhighlightAllRects()),
        addCommentToList: comment => dispatch(commentsActions.addComment(comment)),
        setCommentFormShown: (isShown) => dispatch(commentsActions.setCommentFormShown(isShown)),
        setAnnotationCheckbox: (isChecked) => dispatch(commentsActions.setAnnotationCheckbox(isChecked)),
        syncNewComment: (comment, joinCode) => dispatch({
            type: "socket/COMMENT_ADDED",
            data: {
                comment: comment,
                joinCode: joinCode
            }
        }),
        canvasUpdated: (canvasJSON, joinCode) => dispatch({
            type: "socket/CANVAS_UPDATED", canvasJSON: {
                data: canvasJSON,
                joinCode: joinCode
            }
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);