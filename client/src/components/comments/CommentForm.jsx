import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as commentActions from '../../actions/comment';

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
        this.props.addComment(newComment);
    }

    annotationCheckboxToggled(event) {
        if (event.target.checked) {
            this.props.addAnnotation("some_annotation");
        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        addAnnotation: annotationName => dispatch(commentActions.addAnnotation(annotationName)),
        addComment: comment => dispatch(commentActions.addComment(comment))
    }
};

export default connect(null, mapDispatchToProps)(CommentForm);