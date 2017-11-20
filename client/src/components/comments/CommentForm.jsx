import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as annotationActions from '../../actions/annotation';
import * as realtimeActions from '../../actions/realtime';

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
        this.store(newCommentText, commentAnnotation)

        // Clear textbox and checkbox
        this.refs.text.value = null;
        this.refs.annotationWanted.checked = false;
    }

    annotationCheckboxToggled(event) {
        if (event.target.checked) {
            this.props.addAnnotation();
        } else {
            // SketchField.jsx handles storing the new annotation ID
            this.props.removeAnnotation(this.props.activeAnnotation);
        }
    }

    store(commentText, commentAnnotationId) {
        axios.post('http://localhost:3005/comment/create', {
            joinCode: this.props.lectureCode,
            text: commentText,
            annotation: commentAnnotation
        })
            .then((response) => {
                console.log(response);
                let newComment = response.data;
                this.props.addCommentToList(newComment);
                this.props.syncNewComment(newComment, this.props.lectureCode);
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        return (
            <li className="CommentForm">
                <div className={this.props.className}>
                    <ul style={{ "width": "100%" }}>
                        <form onSubmit={this.submitHandler}>
                            <li className="row">
                                <i className="col s2 material-icons">chat_bubble</i>
                                <div className="col s9">
                                    <input type="text" ref="text" />
                                    <label htmlFor="text">Comment</label>
                                </div>
                            </li>
                            <li className="row">
                                <div className="col s9">
                                    <input type="checkbox" id="annotationWanted" ref="annotationWanted" onChange={this.annotationCheckboxToggled} />
                                    <label htmlFor="annotationWanted">Add Annotation</label>
                                </div>
                                <div className="col s3">
                                    <button>Submit</button>
                                </div>
                            </li>
                        </form>
                    </ul>
                </div>
            </li>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeAnnotation: state.annotationReducer.activeAnnotation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnnotation: () => dispatch(annotationActions.addAnnotation()),
        removeAnnotation: annotation => dispatch(annotationActions.removeAnnotation(annotation)),
        addCommentToList: comment => dispatch(realtimeActions.addComment(comment)),
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