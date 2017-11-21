import React, { Component } from 'react';

class AddCommentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="AddCommentButton center-align">
                <a className="btn-floating waves-effect waves-light" onClick={this.props.onClick}><i className="material-icons">add</i></a>
            </div>
        )
    }
}

export default AddCommentButton;