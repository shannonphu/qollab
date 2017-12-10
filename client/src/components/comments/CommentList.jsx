import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Comment from './Comment';
import CommentForm from './CommentForm';
import * as commentActions from '../../actions/comments';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // Query for current comments based on lecture code when initially joining
        axios.get('http://localhost:3005/comments/' + this.props.joinCode)
            .then((response) => {
                this.props.setInitialComments(response.data);
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        var comments = this.props.comments;

        if (this.props.sortByAnnotationCoordinates) {
            comments.sort((comment1, comment2) => {
                const annotation1 = JSON.parse(comment1.annotation);
                const annotation2 = JSON.parse(comment2.annotation);
                if (annotation1 && annotation2) {
                    const yDiff = annotation1.top - annotation2.top;
                    const xDiff = annotation1.left - annotation2.left;
                    return (yDiff === 0) ? xDiff : yDiff;
                } else if (annotation1) {
                    return -1;
                } else if (annotation2) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }

        return (
            <div className="CommentList">
                <ul className="collapsible popout" data-collapsible="accordion">
                    <CommentForm className="collapsible-header z-depth-3" lectureCode={this.props.joinCode} />
                    {comments.map((comment, index) => (
                        <Comment
                            key={comment._id}
                            id={comment._id}
                            className="collapsible-header z-depth-3"
                            lectureCode={this.props.joinCode}
                            text={comment.text}
                            replies={comment.replies}
                            votes={comment.votes}
                            resolved={comment.resolved}
                            annotation={JSON.parse(comment.annotation)}
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
        comments: state.commentsReducer.comments,
        sortByAnnotationCoordinates: state.commentsReducer.sortByAnnotationCoordinates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialComments: (comments) => dispatch(commentActions.setInitialComments(comments))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);