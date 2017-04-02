import './Frame.less';
import { Link } from 'react-router';

export default class Frame extends React.Component {	
	render() {
		let logInPage;
		// console.log(this.props.location.query);

		if (!this.props.routes[1].path) {
			//if it's logIn page footer and header is hidden
			logInPage = true;
		}

		return (
			<div className={logInPage ? 'log-in-page' : 'frame'}>
				<main className="main">
					<header className="header">
						<div className="wrapper">
							<span className="admin">Admin</span>
							<div className="log-out">
								<Link to="/">Log out</Link>
								<i className="fa fa-sign-out"></i>
							</div>
						</div>
					</header>
					{this.props.children}
				</main>
				<footer className="footer">
					<div className="wrapper">
						&copy; BSU, Faculty of Radiophysics and Computer Technologies
					</div>
				</footer>
			</div>
		);
	}
}