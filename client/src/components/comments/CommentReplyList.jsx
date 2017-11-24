import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommentReply from './CommentReply';
import * as realtimeActions from '../../actions/realtime';
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
        this.state = {
            value: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.replyComment(this.props.id, this.state.value);
        this.setState({value: ""});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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

                <form className="row" onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input id="comment" type="tel" className="validate" value={this.state.value} onChange={this.handleChange} />
                        <label htmlFor="comment">Comment</label>
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
        replyComment: (id, reply) => dispatch(realtimeActions.replyComment(id, reply))
    }
};

export default connect(null, mapDispatchToProps)(CommentReplyList);