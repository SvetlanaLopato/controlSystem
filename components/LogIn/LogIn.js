import React from 'react';
import './LogIn.css'
import { Link } from 'react-router';

export default class LogIn extends React.Component {
	render() {
		return (
			<div className="logIn">
				<h3>Log In</h3>
				<form className="logIn-form">
					<div>
						<label>Email</label>
						<input id="email" placeholder="Enter email..." />
					</div>
					<div>
						<label>Password</label>
						<input id="logIn" placeholder="Enter password..." />
					</div>
					<button className="submit-button">
						<Link to="/directory" 
							onClick={this.handleSubmit}>
							Log in
						</Link>
					</button>
				</form>
			</div>
		);
	}
}