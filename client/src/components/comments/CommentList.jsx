import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Comment from './Comment';
import CommentForm from './CommentForm';
import AddCommentToggle from './AddCommentToggle';
import * as realtimeActions from '../../actions/realtime';

class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentFormShown: false
        }
        this.handleAddCommentClicked = this.handleAddCommentClicked.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        // Query for current comments based on lecture code when initially joining
        axios.get('http://localhost:3003/comments/' + this.props.joinCode)
            .then((response) => {
                this.props.setInitialComments(response.data);
            })
            .catch((error) => {
                throw error;
            });
    }

    handleAddCommentClicked() {
        this.setState({
            commentFormShown: !this.state.commentFormShown
        })
    }

    handleSubmitComment() {
        this.setState({
            commentFormShown: false
        })
    }

    render() {
        const commentForm = this.state.commentFormShown ? <CommentForm className="collapsible-header z-depth-3" lectureCode={this.props.joinCode} onSubmitComment={this.handleSubmitComment}/> : null;
        return (
            <div className="CommentList">
                <AddCommentToggle onClick={this.handleAddCommentClicked} commentFormShown={this.state.commentFormShown}/>
                <ul className="collapsible popout" data-collapsible="accordion">
                    {commentForm}
                    {this.props.comments.map((comment, index) => (
                        <Comment
                            key={index.toString()}
                            id={index}
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
        comments: state.realtimeReducer.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialComments: (comments) => dispatch(realtimeActions.setInitialComments(comments))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);