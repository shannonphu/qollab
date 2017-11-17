import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comment from './Comment';
import CommentForm from './CommentForm';

/**
 * CommentList Component, the list of all comments
 * @class
 * @augments Component
 */
class CommentList extends Component {
    /**
     * Creates a new CommentList Object
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * Renders the list of comments
     * @function
     */
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

/**
 * get redux source's state and map it to component props
 * @param {*} state 
 */
function mapStateToProps(state) {
    return {
        comments: state.comments,
    }
}

export default connect(mapStateToProps)(CommentList);