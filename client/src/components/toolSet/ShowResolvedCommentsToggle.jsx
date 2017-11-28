import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import * as commentsActions from '../../actions/comments';

class ShowResolvedCommentsToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTooltipContent = this.getTooltipContent.bind(this);
    }

    getTooltipContent() {
        return (this.props.showResolvedCommentsToggled) ? "Hide Resolved Comments" : "Show Resolved Comments";
    }

    render() {
        const icon = this.props.showResolvedCommentsToggled ? <i className="material-icons">visibility_off</i> : <i className="material-icons">visibility</i>;
        return(
            <div className="ShowResolvedCommentsToggle">
                <a data-tip data-for="ShowResolvedCommentsToggleTooltip" onClick={this.props.toggleShowResolvedComments} className="btn-floating yellow">
                    {icon}
                </a>
                <ReactTooltip place="left" type="info" effect="solid" id="ShowResolvedCommentsToggleTooltip" getContent={[this.getTooltipContent, 100]} />
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