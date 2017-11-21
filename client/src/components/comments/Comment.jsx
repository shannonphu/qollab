import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentReplyList from './CommentReplyList';
import * as realtimeActions from '../../actions/realtime';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upVoteHandler = this.upVoteHandler.bind(this);
        this.resolveHandler = this.resolveHandler.bind(this);
    }

    upVoteHandler() {
        this.props.upVoteComment(this.props.id);
    }

    resolveHandler() {
        this.props.resolveComment(this.props.id);
    }

    render() {
        if (this.props.resolved) {
            return (null);
        } else {
            return (
                <li className="Comment">
                    <div className={this.props.className}>
                        <ul style={{ "width": "100%" }}>
                            <li>
                                <i className="material-icons">chat_bubble</i>
                                <span>{this.props.text}</span>
                            </li>
                            <li>
                                <div className="left">
                                    <a onMouseDown={this.upVoteHandler} >
                                        <i className="material-icons not-collapse">thumb_up</i>
                                    </a>
                                    <strong>{this.props.votes}</strong>
                                </div>
                                <div className="right">
                                    <a onMouseDown={this.resolveHandler} >
                                        <i className="material-icons not-collapse">close</i>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <CommentReplyList replies={this.props.replies} id={this.props.id} />
                </li>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upVoteComment: id => dispatch(realtimeActions.upVoteComment(id)),
        resolveComment: id => dispatch(realtimeActions.resolveComment(id))
    }
};

export default connect(null, mapDispatchToProps)(Comment);