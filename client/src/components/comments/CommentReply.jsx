import React, { Component } from 'react';

/**
 * Comment reply
 */
class CommentReply extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * renders the reply
     * @returns html details of the reply
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