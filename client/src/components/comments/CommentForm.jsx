import React, { Component } from 'react';

/**
 * CommentFrom Component to write and submit a comment
 * @class
 * @augments Component
 */
class CommentForm extends Component {
    /**
     * Creates a new CommentForm component
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.submitHandler = this.submitHandler.bind(this);
    }

    /**
     * Handles comment submission
     * @param {*} event 
     */
    submitHandler(event) {

    }

    /**
     * Renders the comment form
     * @function
     */
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
                                    <input type="checkbox" id="annotationWanted" ref="annotationWanted" />
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

export default CommentForm;