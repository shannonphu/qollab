import React, { Component } from 'react';

class AddCommentToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const icon = this.props.commentFormShown ? <i className="material-icons">arrow_drop_up</i> : <i className="material-icons">arrow_drop_down</i>;
        return(
            <div className="AddCommentToggle center-align">
                <a className="btn-floating waves-effect waves-light" onClick={this.props.onClick}>
                    {icon}
                </a>
            </div>
        )
    }
}

export default AddCommentToggle;