import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commentsActions from '../../actions/comments';

class AddCommentToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setCommentFormShown(!this.props.commentFormShown);
    }

    render() {
        const icon = this.props.commentFormShown ? <i className="material-icons">arrow_drop_up</i> : <i className="material-icons">arrow_drop_down</i>;
        return(
            <div className="AddCommentToggle center-align">
                <a className="btn-floating waves-effect waves-light" onClick={this.handleClick}>
                    {icon}
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        commentFormShown: state.commentsReducer.commentFormShown
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCommentFormShown: (isShown) => dispatch(commentsActions.setCommentFormShown(isShown))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentToggle);