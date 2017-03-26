import './LogIn.css';
import React from 'react';
import { Link } from 'react-router';

export default class LogIn extends React.Component {
	render() {
		return (
			<div className="log-in">
				<h3>Log In</h3>
				<form className="log-in-form">
					<div>
						<label>Email</label>
						<input id="email" placeholder="Enter email..." />
					</div>
					<div>
						<label>Password</label>
						<input id="logIn" placeholder="Enter password..." />
					</div>
					<button className="submit-button button">
						<Link to="/directory">Log in</Link>
					</button>
				</form>
			</div>
		);
	}
}