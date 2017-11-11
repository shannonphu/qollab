import React, { Component } from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="CommentList">
                <ul className="collapsible popout" data-collapsible="accordion">
                    <CommentForm className="collapsible-header z-depth-3" />
                    
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