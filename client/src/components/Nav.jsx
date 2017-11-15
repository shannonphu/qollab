import React, { Component } from 'react';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="navbar-fixed">
            <nav className="light-blue lighten-1" role="navigation">
                <div className="nav-wrapper">
                    <div className="brand-logo center">{this.props.title}</div>
                    <a href="#" data-activates="mobile-collapse" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="#"><i className="material-icons left">home</i>Qollab</a></li>
                    </ul>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#"><i className="material-icons left">people</i>Students</a></li>
                        <li><a href="#"><i className="material-icons left">insert_chart</i>Poll</a></li>
                    </ul>
                    {/* Mobile Collapse Buttons */}
                    <ul className="side-nav" id="mobile-collapse">
                        <li><a href="#"><i className="material-icons left">home</i>Qollab</a></li>
                        <li><a href="#"><i className="material-icons left">people</i>Students</a></li>
                        <li><a href="#"><i className="material-icons left">insert_chart</i>Poll</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}

export default Nav;