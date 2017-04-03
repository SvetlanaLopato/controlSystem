import { Link } from 'react-router';

export default class List extends React.Component {
	render() {
		console.log(this.props);
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
				<ul className="nav">
					{
						list.map((item, index) => (
							<li key={index}>
								<Link to={"/board/" + index}>{item.name}</Link>
							</li>
						))
					}
				</ul>
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