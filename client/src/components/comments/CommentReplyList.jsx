import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import CommentReply from './CommentReply';
import * as realtimeActions from '../../actions/realtime';

class CommentReplyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reply: ""
        }
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
        this.handleReplyValueChange = this.handleReplyValueChange.bind(this);
    }

    handleSubmitReply(event) {
        event.preventDefault();
        this.store();        
    }

    store() {
        let commentId = this.props.commentId;
        
        axios.post('http://localhost:3005/comment/reply', {
            commentID: commentId,
            replyText: this.state.reply
        })
            .then((response) => {
                let lectureCode = this.props.lectureCode;
                this.props.replyComment(commentId, lectureCode, this.state.reply);
                this.props.syncReplyComment(commentId, lectureCode, this.state.reply);
                this.setState({ reply: "" });                
            })
            .catch((error) => {
                throw error;
            });
    }

    handleReplyValueChange(event) {
        this.setState({reply: event.target.value});
    }

    render() {
        return (
            <div className="CommentReplyList collapsible-body">
                <table className="striped bordered">
                    <tbody>
                        {this.props.replies.map((reply, index) => (
                            <tr key={index.toString()}>
                                <td><CommentReply text={reply} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <form className="row" onSubmit={this.handleSubmitReply}>
                    <div className="input-field">
                        <input id="reply" type="tel" className="validate" autoComplete="off" value={this.state.reply} onChange={this.handleReplyValueChange} />
                        <label htmlFor="reply">Write a reply...</label>
                    </div>
                    <button className="btn-small btn waves-effect waves-light" type="submit" name="action">
                        Submit<i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        replyComment: (id, lectureCode, reply) => dispatch(realtimeActions.replyComment(id, lectureCode, reply)),
        syncReplyComment: (commentID, lectureCode, reply) => dispatch({
            type: "socket/COMMENT_REPLY_ADDED",
            data: {
                commentID: commentID,
                lectureCode: lectureCode,
                reply: reply
            }
        })
    }
};

export default connect(null, mapDispatchToProps)(CommentReplyList);