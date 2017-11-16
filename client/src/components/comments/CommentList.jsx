import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                            id={comment.id}
                            className="collapsible-header z-depth-3"
                            text={comment.text}
                            replies={comment.replies}
                            votes={comment.votes}
                            resolved={comment.resolved}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

//get redux source's state and map it to component props
function mapStateToProps(state) {
    return {
        comments: state.commentsReducer.comments
    }
}

export default connect(mapStateToProps, null)(CommentList);