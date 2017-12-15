import React, { Component } from 'react'
import axios from 'axios';

require('./styles/lecture.css');

/**
 * Dashboard for instructors
 */
class InstructorDashboard extends Component {
	/**
	 * @constructor
	 * @param {Object} props 
	 */
	constructor(props) {
		super(props);
		this.state = {};

		axios.get('http://localhost:3005/user/current', {
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

	/**
	 * renders the dashboard
	 * @returns the html-form details of the dashboard
	 */
	render() {
		if (!this.state.user) {
			return (null);
		}

		return (
			<div className='InstructorDashboard row'>
				{this.state.user.lectures.map((lecture, index) => (
					<div className="col s4" key={index}>
						<div className="card horizontal">
							<div className="card-stacked">
								<div className="card-content">
									<h4>{lecture.title}</h4>
									<p>{lecture.comments.length} Comments</p>
								</div>
								<div className="card-action">
									<a href={"/lecture/" + lecture.joinCode}>Join</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}
}

export default InstructorDashboard;