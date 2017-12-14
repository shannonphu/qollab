import React, { Component } from 'react';
import axios from 'axios';

require('./styles/lecture.css');

class LoginNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        axios.get('http://localhost:3005/me/', {
            withCredentials: true
        })
            .then((response) => {
                this.setState({
                    user: response.data
                });
            })
            .catch((error) => {
                throw error;
            });
    }

    render() {
        if (!this.state.user) {
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

export default LoginNotification