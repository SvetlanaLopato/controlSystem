import './Board.less';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router';

import dataBaseService from '../../dataBaseService';
import Task from '../Task/Task';
import DropTargetCol from './DropTargetCol';

class Board extends React.Component {
	componentWillMount() {
		this.setState({
			tasks: dataBaseService.getTasks(this.props.params.param),
		});
	}

	getTasksByState = (state) => {
		return dataBaseService.getTasks(this.props.params.param).filter(task => task.state === state);
	}

	render() {
		const BLOCKED = 'blocked',
			  TODO = 'to do',
			  INPROGRESS = 'in progress',
			  REVIEW = 'review',
			  DONE = 'done';
		const userRole = dataBaseService.getUserRole();

		return (
			<div className="board-profile">
				<div className="board-description">
					<p>
						<span>Subject: </span>
						{
							userRole === 'student' ? this.props.params.param : dataBaseService.getUserProperty('subject')
						}
					</p>
					{
						dataBaseService.getUserRole() === 'teacher' &&
						<p><span>Subject: </span>{dataBaseService.getUserProperty('subject')}</p> &&
						<p><span>Student: </span>{
							dataBaseService.getStudentProperty(this.props.params.param, 'name') + ' (' + dataBaseService.getStudentProperty(this.props.params.param, 'group') + ' group)'
						}</p>
					}
				</div>
				<div className="board">
					<div className="col">
						<div className="col-header">Blocked</div>
						<DropTargetCol colState={BLOCKED} tasks={this.getTasksByState(BLOCKED)}/>
					</div>
					<div className="col">
						<div className="col-header">To Do</div>
						<DropTargetCol colState={TODO} tasks={this.getTasksByState(TODO)}/>
					</div>
					<div className="col">
						<div className="col-header">In Progress</div>
						<DropTargetCol colState={INPROGRESS} tasks={this.getTasksByState(INPROGRESS)}/>
					</div>
					<div className="col">
						<div className="col-header">Review</div>
						<DropTargetCol colState={REVIEW} tasks={this.getTasksByState(REVIEW)}>
						</DropTargetCol>
					</div>
					<div className="col">
						<div className="col-header">Done</div>
						<DropTargetCol colState={DONE} tasks={this.getTasksByState(DONE)}>
						</DropTargetCol>
					</div>
				</div>
				<div className="board-instruction">Drag task for changing state*</div>
				<div className="back-button button">
					<Link to="/list">
						<i className="fa fa-chevron-left"></i>
						Back
					</Link>
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Board);