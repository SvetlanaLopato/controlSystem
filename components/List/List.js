import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

export default class List extends React.Component {
	render() {
		console.log(this.props.location.query);
		const list = [{
			id: 1,
			subject: 'Phisics',
			name: 'Sara',
			status: 'review',
			mark: 10,
		}, {
			id: 2,
			subject: 'Phisics',
			name: 'Sara',
			status: 'in progress',
			mark: 2,
		}, {
			id: 3,
			subject: 'Phisics',
			name: 'joh',
			status: 'done',
			mark: 8,
		}, {
			id: 4,
			subject: 'Phisics',
			name: 'Katty',
			status: 'in progress',
			mark: 9,
		}];

		return (
			<div className="wrapper">
				<h2>List:</h2>
				<Nav>
				{
					list.map((item, index) => (
						<NavItem href={"/board/" + index} key={index}>
							{item.name}
						</NavItem>
					))
				}
				</Nav>
				<div className="back-button button">
					<Link to="/directory">
						<i className="fa fa-chevron-left"></i>
						Back
					</Link>
				</div>
			</div>
		);
	}
}