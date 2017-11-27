import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as commentsActions from '../../actions/comments';

class ShowResolvedCommentsToggle extends Component {
    render() {
        const icon = this.props.showResolvedCommentsToggled ? <i className="material-icons">visibility</i> : <i className="material-icons">visibility_off</i>;
        return(
            <a onClick={this.props.toggleShowResolvedComments} className="btn-floating yellow">{icon}</a>
        )
    }
}

function mapStateToProps(state) {
    return {
        showResolvedCommentsToggled: state.commentsReducer.showResolvedCommentsToggled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleShowResolvedComments: () => dispatch(commentsActions.toggleShowResolvedComments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowResolvedCommentsToggle);