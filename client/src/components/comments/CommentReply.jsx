import React, { Component } from 'react';

class CommentReply extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

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