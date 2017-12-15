import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom';
import $ from 'jquery'; 

import * as commentsActions from '../../actions/comments';

/**
 * toggle for showing/hiding resolved comments
 */
class ShowResolvedCommentsToggle extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.getTooltipContent = this.getTooltipContent.bind(this);
    }

    componentDidMount() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    }

    getTooltipContent() {
        return (this.props.showResolvedCommentsToggled) ? "Hide Resolved Comments" : "Show Resolved Comments";
    }

    render() {
        const icon = this.props.showResolvedCommentsToggled ? <i className="material-icons">unfold_less</i> : <i className="material-icons">unfold_more</i>;
        return(
            <div ref="disableTextSelect" className="ShowResolvedCommentsToggle">
                <a data-tip data-for="ShowResolvedCommentsToggleTooltip" onClick={this.props.toggleShowResolvedComments} className="btn-floating teal lighten-3">
                    {icon}
                </a>
                <ReactTooltip place="left" type="info" effect="solid" id="ShowResolvedCommentsToggleTooltip" getContent={[this.getTooltipContent, 100]} />
            </div>
        )
    }
}

/**
 * get redux source's state and map it to component props
 * @param {*} state 
 */
function mapStateToProps(state) {
    return {
        showResolvedCommentsToggled: state.commentsReducer.showResolvedCommentsToggled
    }
}

/**
 * map dispatch to component props
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        toggleShowResolvedComments: () => dispatch(commentsActions.toggleShowResolvedComments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowResolvedCommentsToggle);