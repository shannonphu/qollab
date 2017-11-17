import React, { Component } from 'react';

/**
 * CommentReply component for one reply to a comment
 * @class 
 * @augments Component
 */
class CommentReply extends Component {
    /**
     * Creates a new CommentReply object
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * Renders the reply to the comment
     * @function
     */
    render() {
        return (
            <div className="CommentReply">
                <i className="material-icons">person</i>
                <span>{this.props.text}</span>
            </div>
        )
    }
}

export default CommentReply