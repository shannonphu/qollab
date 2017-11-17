import React, { Component } from 'react';

import CommentReplyList from './CommentReplyList';

/**
 * Comments component
 * @class
 * @augments Component
 */
class Comment extends Component {
    /**
     * Creates a new Comment object
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the comment with its reply list
     * @function
     */
    render() {
        return (
            <li className="Comment">
                <div className={this.props.className}>
                    <ul>
                        <li>
                            <i className="material-icons">chat_bubble</i>
                            <span>{this.props.text}</span>
                        </li>
                        <li>
                            <div className="left">
                                <a href="#"><i className="material-icons not-collapse">thumb_up</i></a>
                                <strong>{this.props.votes}</strong>
                            </div>
                            <div className="right">
                                <a href="#"><i className="material-icons not-collapse">check</i></a>
                            </div>
                        </li>
                    </ul>
                </div>

                <CommentReplyList replies={this.props.replies}/>
            </li>
        );
    }
}

export default Comment;