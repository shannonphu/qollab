import React, { Component } from 'react';

import CommentReply from './CommentReply';

class CommentReplyList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
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

                <form className="row">
                    <div className="input-field">
                        <input id="comment" type="tel" className="validate" />
                        <label htmlFor="comment">Comment</label>
                    </div>
                    <button className="btn-small btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default CommentReplyList