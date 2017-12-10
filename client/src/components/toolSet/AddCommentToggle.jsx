import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import $ from 'jquery'; 

import * as commentsActions from '../../actions/comments';

class FocusModeToggle extends Component {
    constructor(props) {
        super(props);
        this.getTooltipContent = this.getTooltipContent.bind(this);
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
    }

    toggleCommentForm() {
        this.props.setCommentFormShown(!this.props.commentFormShown);
    }

    componentDidMount() {
        $(findDOMNode(this.refs.disableTextSelect)).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    }

    getTooltipContent() {
        return (this.props.commentFormShown) ? "Cancel Comment" : "Add New Comment";
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(FocusModeToggle);