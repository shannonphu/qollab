import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import * as commentsActions from '../../actions/comments';

class ShowResolvedCommentsToggle extends Component {
    render() {
        const icon = this.props.showResolvedCommentsToggled ? <i className="material-icons">visibility_off</i> : <i className="material-icons">visibility</i>;
        const tooltip = this.props.showResolvedCommentsToggled ? <span>Hide Resolved Comments</span> : <span>Show Resolved Comments</span>
        return(
            <div className="ShowResolvedCommentsToggle">
                <a data-tip data-for="ShowResolvedCommentsToggleTooltip" onClick={this.props.toggleShowResolvedComments} className="btn-floating yellow">
                    {icon}
                </a>
                <ReactTooltip place="left" type="info" id="ShowResolvedCommentsToggleTooltip">
                    {tooltip}
                </ReactTooltip>
            </div>
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