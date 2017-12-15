import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./styles/lecture.css');

/**
 * Component for login notification
 */
class LoginNotification extends Component {
    /**
     * @constructor
     * @param {Object} props 
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * renders the LoginNotification
     * @returns html details of the login notification
     */
    render() {
        if (!this.props.user) {
            return (
                <div className="tap-target teal accent-4" data-activates="login-button">
                    <div className="tap-target-content">
                        <h5>Not Authenticated!</h5>
                        <p>Please login through Google by clicking this button.</p>
                    </div>
                </div>
            );
        } else {
            return (null);
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, null)(LoginNotification);