import React, { Component } from 'react';

import Comment from './Comment';

class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="CommentList">
                <ul className="collapsible popout" data-collapsible="accordion">
                    {this.props.comments.map((comment, index) => (
                        <Comment
                            key={index.toString()}
                            className="collapsible-header z-depth-3"
                            text={comment.text}
                            replies={comment.replies}
                            votes={comment.votes}
                            resolved={comment.resolved} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default CommentList