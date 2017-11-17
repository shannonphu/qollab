import React, { Component } from 'react';
import axios from 'axios';

import JoinLectureForm from './JoinLectureForm';

/**
 * CreateLectureForm component, which provides a form to create a lecture with a lecture name and a joining code.
 * @class
 * @extends Component
 */
class CreateLectureForm extends Component {
    /**
     * Creates a new CreateLectureForm for creating lectures
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
     * Handles submissions for creating lectures
     * @param {*} event 
     */
    submitHandler(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        console.log(name);
        // Check if the input join code exists in the database
        // TODO: Set actual instructorId
        axios.post('http://localhost:3005/create/', {
            instructorId: 'instructorID',
            lectureName: name
        })
        .then((response) => {
            this.setState({
                redirect: true,
                lectureCode: response.data.joinCode
            });
        })
        .catch((error) => {
            // TODO: Redirect to 'no lecture found for this join code' view
            throw error;
        });
    }

    /**
     * Renders this form
     */
    render() {
        if (this.state.redirect) {            
            return (
                <div>
                    <p>You can join your lecture at this code: <strong>{this.state.lectureCode}</strong></p>
                    <JoinLectureForm />
                </div>
            );
        } else {
            return (
                <div className='CreateLectureForm container'>
                    <h3>Create Your Lecture:</h3>
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Lecture Name" ref="name" />
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default CreateLectureForm