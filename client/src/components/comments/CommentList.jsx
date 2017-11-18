import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Comment from './Comment';
import CommentForm from './CommentForm';
import * as realtimeActions from '../../actions/realtime';

class CommentList extends Component {
    constructor(props) {
        super(props)

        // Query for current comments based on lecture code when initially joining
        axios.get('http://localhost:3003/comments/' + this.props.joinCode)
            .then((response) => {
                this.props.setInitialComments(response.data);
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        return (
            <div className="CommentList">
                <ul className="collapsible popout" data-collapsible="accordion">
                    <CommentForm className="collapsible-header z-depth-3" lectureCode={this.props.joinCode} />

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