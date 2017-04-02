import './Board.less';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router';

import Task from '../Task/Task';
import DropTargetCol from './DropTargetCol';

class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			tasksCol5:taskCol5,
			tasksCol4: taskCol4,
		};
	}

	render() {
		return (
			<div className="board-profile">
				<div className="board">
					<div className="col">
						<div className="col-header">Blocked</div>
						<DropTargetCol colState="blocked" />
					</div>
					<div className="col">
						<div className="col-header">To Do</div>
						<DropTargetCol colState="to do" />
					</div>
					<div className="col">
						<div className="col-header">In Progress</div>
						<DropTargetCol colState="in progress" />
					</div>
					<div className="col">
						<div className="col-header">Review</div>
						<DropTargetCol colState="review" tasks={this.state.tasksCol4}>
						</DropTargetCol>
					</div>
					<div className="col">
						<div className="col-header">Done</div>
						<DropTargetCol colState="done" tasks={this.state.tasksCol5}>
						</DropTargetCol>
					</div>
				</div>
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

let taskCol5 = [{
			id: 1,
			title: 'Computer nerwork',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Kolokvium',
			state: 'done',
		}, {
			id: 2,
			title: 'Science',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Exercise',
			state: 'done',
		}, /*{
			id: 3,
			title: 'Math',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Presentation',
		}, {
			id: 4,
			title: 'Computer nerwork',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Lab 1',
		}*/];
let taskCol4 = [{
			id: 5,
			title: 'Maths',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Test',
			state: 'review',
		}, {
			id: 8,
			title: 'Phisics',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Lab 4',
			state: 'review',
		}, /*{
			id: 6,
			title: 'Math',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Presentation',
		}, {
			id: 7,
			title: 'Computer nerwork',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Lab 1',
		}*/];
