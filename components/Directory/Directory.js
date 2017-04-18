import './Directory.less';
import { Link } from 'react-router';
import dataBaseService from '../../dataBaseService';

export default class Directory extends React.Component {
	constructor() {
		super();
		this.state = {
			groups: [],
		};
	}

	componentWillMount() {
		this.setState({ groups: dataBaseService.getUserProperty('groups') })
	}

	render() {

		return (
			<div className="wrapper">
				<h2>List of groups:</h2>
				<ul className="nav">
					{
						this.state.groups.map((group, index) => (
							<li key={index}>
								<Link to={{ pathname: 'list', query:{ group: group } }}>{group + ' group'}</Link>
							</li>
						))
					}
				</ul>
				<div className="back-button button">
					<Link to="/">
						<i className="fa fa-chevron-left"></i>
						Back
					</Link>
				</div>
			</div>
		);
	}
}
