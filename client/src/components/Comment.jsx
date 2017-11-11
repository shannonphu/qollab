import React, { Component } from 'react';

import CommentReplyList from './CommentReplyList';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className="Comment">
                <div className="collapsible-header z-depth-3">
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