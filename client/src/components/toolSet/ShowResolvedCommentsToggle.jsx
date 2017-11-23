import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as realtimeActions from '../../actions/realtime';

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
        showResolvedCommentsToggled: state.realtimeReducer.showResolvedCommentsToggled
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleShowResolvedComments: () => dispatch(realtimeActions.toggleShowResolvedComments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowResolvedCommentsToggle);