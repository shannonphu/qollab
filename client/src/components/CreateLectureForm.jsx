import React, { Component } from 'react';
import axios from 'axios';

class CreateLectureForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    submitHandler(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        // Check if the input join code exists in the database
        axios.post('http://localhost:3005/create/', {
            lectureName: name
        }, {
            withCredentials: true
        })
        .then((response) => {
            this.setState({
                redirect: true,
                lectureCode: response.data.joinCode,
                lectureTitle: name
            });
        })
        .catch((error) => {
            // TODO: Redirect to 'no lecture found for this join code' view
            throw error;
        });
    }

    render() {
        if (this.state.redirect) {            
            return (
                <div className="container">
                    <h3>You can join {this.state.lectureTitle} at this code: <strong><a href={"/lecture/" + this.state.lectureCode}>{this.state.lectureCode}</a></strong></h3>
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