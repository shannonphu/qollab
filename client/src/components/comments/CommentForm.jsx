import React, { Component } from 'react';
import { connect } from 'react-redux';

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

        let newComment = {
            text: this.refs.text.value,
            replies: [],
            votes: 0,
            resolved: false,
        };
        this.props.addCommentToList(newComment);
        this.props.syncNewComment(newComment, this.props.lectureCode);

        // Clear textbox and checkbox
        this.refs.text.value = null;
        this.refs.annotationWanted.checked = false;
    }

    annotationCheckboxToggled(event) {
        if (event.target.checked) {
            this.props.addAnnotation();
        } else {
            // SketchField.jsx handles storing the new annotation ID
            this.props.removeAnnotation(this.props.activeAnnotationId);
        }
    }

    render() {
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
                            <label for="add_comment">Add New Comment</label>
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

function mapStateToProps(state) {
    return {
        activeAnnotationId: state.annotationReducer.activeAnnotationId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnnotation: () => dispatch(annotationActions.addAnnotation()),
        removeAnnotation: annotationId => dispatch(annotationActions.removeAnnotation(annotationId)),
        storeAnnotationId: annotationId => dispatch(annotationActions.storeAnnotationId(annotationId)),
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