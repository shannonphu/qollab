import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentReplyList from './CommentReplyList';
import * as commentActions from '../../actions/comment';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upVoteHandler = this.upVoteHandler.bind(this);
    }

    upVoteHandler() {
        console.log("Comment: upVoteHandler with id = " + this.props.id);
        this.props.upVoteComment(this.props.id);
    }

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
                                <a href="#" onMouseDown={this.upVoteHandler} >
                                    <i className="material-icons not-collapse">thumb_up</i>
                                </a>
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

const mapDispatchToProps = (dispatch) => {
    return {
        upVoteComment: id => dispatch(commentActions.upVoteComment(id))
    }
};

export default connect(null, mapDispatchToProps)(Comment);