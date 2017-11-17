import React, { Component } from 'react';

import CommentReply from './CommentReply';
/**
 * CommentReplyList components, including a list of replies for a certain comment
 * @class
 * @augments Component
 */
class CommentReplyList extends Component {
    /**
     * Create a new CommentReplyList object
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * Renders the comment reply list
     * @function
     */
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