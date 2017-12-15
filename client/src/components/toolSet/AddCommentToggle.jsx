import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import $ from 'jquery'; 

import * as commentsActions from '../../actions/comments';

/**
 * Component for the toggle of adding comment
 */
class AddCommentToggle extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.getTooltipContent = this.getTooltipContent.bind(this);
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
    }

    /**
     * toggles to show/hide the comment form
     */
    toggleCommentForm() {
        this.props.setCommentFormShown(!this.props.commentFormShown);
    }

    /**
     * invoked after the component is mounted
     * finds the DOM Nodes and loads attributes
     */
    componentDidMount() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    }

    /**
     * get corresponding messages for adding/canceling comments
     */
    getTooltipContent() {
        return (this.props.commentFormShown) ? "Cancel Comment" : "Add New Comment";
    }

    /**
     * renders the toggle
     */
    render() {
        const icon = this.props.commentFormShown ? <i className="material-icons">clear</i> : <i className="material-icons">comment</i>;        
        return(
            <div ref="disableTextSelect" className="AddCommentToggle">
                <a data-tip data-for="AddCommentToggleTooltip" onClick={this.toggleCommentForm} className="btn-floating teal lighten-1">
                    {icon}
                </a>
                <ReactTooltip place="left" type="info" effect="solid" id="AddCommentToggleTooltip" getContent={[this.getTooltipContent, 100]} />
            </div>
        )
    }
}

/**
 * maps state to component props
 * @param {*} state 
 */
function mapStateToProps(state) {
    return {
        commentFormShown: state.commentsReducer.commentFormShown
    }
}

/**
 * maps the dispatch to component props
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        setCommentFormShown: (isShown) => dispatch(commentsActions.setCommentFormShown(isShown))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusModeToggle);