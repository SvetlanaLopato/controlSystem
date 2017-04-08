import { Link } from 'react-router';
import dataBaseService from '../../dataBaseService';

export default class List extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
		};
	}

	componentWillMount() {
		this.setState({
			list: dataBaseService.getUserRole() === 'teacher' ?
				  dataBaseService.getStudentsList(this.props.location.query.group) :
				  dataBaseService.getSubjectsList(),
		})
	}

	render() {
		const isTeacher = dataBaseService.getUserRole() === 'teacher';

		return (
			<div className="wrapper">
				<h2>List:</h2>
				<ul className="nav">
					{
						this.state.list.map((item, index) => (
							<li key={index}>
							{
								isTeacher ? <Link to={"/board/" + item.id}>{item.name}</Link> :
											<Link to={"/board/" + item}>{item}</Link>
							}
							</li>
						))
					}
				</ul>
				<div className="back-button button">
					<Link to={isTeacher ? '/directory' : '/'}>
						<i className="fa fa-chevron-left"></i>
						Back
					</Link>
				</div>
			</div>
		);
	}
}