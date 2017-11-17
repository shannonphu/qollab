import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/**
 * JoinLectureForm component, which provides a form to enter a lecture code to join the lecture.
 * @class
 * @extends Component
 */
class JoinLectureForm extends Component {
    /**
     * Creates a new JoinLectureForm object
     * @constructor
     * @param {PropTypes.Object} props 
     */
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    /**
     * Handles submissions for joining lectures
     * @function
     * @param {*} event 
     */
    submitHandler(event) {
        event.preventDefault();
        let joinCode = this.refs.joinCode.value;

        // Check if the input join code exists in the database
        axios.get('http://localhost:3005/lecture/' + joinCode)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    redirect: true,
                    joinCode: joinCode
                });
            })
            .catch((error) => {
                // TODO: Redirect to 'no lecture found for this join code' view
                throw error;
            });
    }

    /**
     * Renders this form
     * @function
     */
    render() {
        if (this.state.redirect) {
            return (<Redirect to={"/lecture/" + this.state.joinCode} />);
        } else {
            return (
                <div className='JoinLectureForm container'>
                    <center><p>Enter Code Below:</p></center>
                    <div className="row">
                        <div className="input-field col s12"></div>
                        <form onSubmit={this.submitHandler}>
                            <input placeholder="123456" type="number" className="validate" ref="joinCode" />
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default JoinLectureForm