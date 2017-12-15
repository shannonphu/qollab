import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import $ from 'jquery'; 

import * as commentsActions from '../../actions/comments';
import * as realtimeActions from '../../actions/realtime';

/**
 * toggle for focus mode
 */
class FocusModeToggle extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.getTooltipContent = this.getTooltipContent.bind(this);
        this.toggleFocusMode = this.toggleFocusMode.bind(this);
    }

    toggleFocusMode() {
        if (this.props.focusModeActive) {
            this.props.showAnnotations();            
        } else {
            this.props.hideAnnotations();            
        }

        this.props.toggleFocusMode();
    }

    componentDidMount() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    }

    getTooltipContent() {
        return (this.props.focusModeActive) ? "Show Annotations" : "Hide Annotations";
    }

    render() {
        const icon = this.props.focusModeActive ? <i className="material-icons">visibility</i> : <i className="material-icons">visibility_off</i>;
        return(
            <div ref="disableTextSelect" className="FocusModeToggle">
                <a data-tip data-for="FocusModeToggleTooltip" onClick={this.toggleFocusMode} className="btn-floating teal lighten-2">
                    {icon}
                </a>
                <ReactTooltip place="left" type="info" effect="solid" id="FocusModeToggleTooltip" getContent={[this.getTooltipContent, 100]} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        focusModeActive: state.commentsReducer.focusModeActive
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleFocusMode: () => dispatch(commentsActions.toggleFocusMode()),
        showAnnotations: () => dispatch(realtimeActions.showAnnotations()),
        hideAnnotations: () => dispatch(realtimeActions.hideAnnotations())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FocusModeToggle);