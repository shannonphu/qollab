import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Nav">

                {/* Mobile Collapse Buttons */}
                <ul className="side-nav" id="mobile-collapse">
                    <li><a href="/"><i className="material-icons left">home</i>Home</a></li>
                    <li><a href="/lecture/create"><i className="material-icons left">add_circle</i>New Lecture</a></li>
                    <li><a href='http://localhost:3005/auth/google'><i className="material-icons left">account_circle</i>Login</a></li>
                </ul>

                <div className="navbar-fixed">
                    <nav className="teal darken-2" role="navigation">
                        <div className="nav-wrapper">
                            <ul className="left hide-on-med-and-down">
                                <li><a href="/"><i className="material-icons left">home</i></a></li>
                            </ul>
                            <div className="brand-logo center">{this.props.lecture ? this.props.lecture.title : "Qollab"}</div>
                            <ul className="right hide-on-med-and-down">
                                <li><a href="/lecture/create"><i className="material-icons">add_circle</i></a></li>
                                <li><a href='http://localhost:3005/auth/google'><i className="material-icons">account_circle</i></a></li>
                            </ul>

                            {/* Mobile Collapse Buttons */}
                            <a href="#" data-activates="mobile-collapse" className="button-collapse">
                                <i className="material-icons">menu</i>
                            </a>
                        </div>
                    </nav>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lecture: state.lectureReducer.lecture
    }
}

export default connect(mapStateToProps, null)(Nav);