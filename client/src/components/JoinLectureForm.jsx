import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
        this.setState({
            redirect: true,
            joinCode: joinCode
        });
    }

    render() {
        if (this.state.redirect) {
            return(<Redirect to={"/lecture/" + this.state.joinCode} />);
        } else {
            return (
                <div className='JoinLectureForm'>
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