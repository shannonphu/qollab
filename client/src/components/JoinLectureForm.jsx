import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class JoinLectureForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    submitHandler(event) {
        event.preventDefault();
        let joinCode = this.refs.joinCode.value;
        if (joinCode.length === 0) {
            return;
        }

        // Check if the input join code exists in the database
        axios.get('http://db_api:3005/lecture/' + joinCode)
            .then((response) => {
                this.setState({
                    redirect: true,
                    joinCode: joinCode
                });
            })
            .catch((error) => {
                return (<Redirect to="/join" />);
            });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={"/lecture/" + this.state.joinCode} />);
        } else {
            return (
                <div className='JoinLectureForm container'>
                    <h5 className="center-align">Please Enter Code:</h5>
                    <form onSubmit={this.submitHandler}>
                        <div className="input-field">
                            <input placeholder="123456" type="number" className="validate" ref="joinCode" style={{"text-align":"center"}}/>
                        </div>
                        <div className="center-align">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default JoinLectureForm