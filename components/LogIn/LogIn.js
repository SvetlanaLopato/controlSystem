import './LogIn.less';
import { browserHistory } from 'react-router';
import dataBaseService from '../../dataBaseService';

export default class LogIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			isValid: true,
		};
	}

	handelClick = () => {
		let userRole;
		if (this.state.email && this.state.password) {
			userRole = dataBaseService.checkAuthenticity(this.state.email, this.state.password);
		}

		if (userRole === 'student') {
			browserHistory.push('/list');
		} else if (userRole === 'teacher') {
			browserHistory.push('/directory');
		} else {
			this.setState({ isValid: false });
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	}

	render() {
		return (
			<div className="log-in">
				<h3>Log In</h3>
				<form className="log-in-form">
					<div>
						<label>Email</label>
						<input 
							type="email"
							onChange={this.handleChange}
							id="email"
							placeholder="Enter email..."
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							type="password"
							onChange={this.handleChange}
							id="password"
							placeholder="Enter password..."
						/>
					</div>
					{
						!this.state.isValid && <div className="invalid">The email or password you’ve entered doesn’t match any account</div>
					}
					<div className="submit-button button" onClick={this.handelClick}>
						<span>Log in</span>
					</div>
				</form>
			</div>
		);
	}
}