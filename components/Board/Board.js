import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './Board.css';

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
			<div className="board">
				<div className="col">
					<div className="col-header">Blocked</div>
				</div>
				<div className="col">
					<div className="col-header">To Do</div>
				</div>
				<div className="col">
					<div className="col-header">In Progress</div>
					<DropTargetCol />
				</div>
				<div className="col">
					<div className="col-header">Review</div>
					<DropTargetCol tasks={this.state.tasksCol5}>
					</DropTargetCol>
				</div>
				<div className="col">
					<div className="col-header">Done</div>
					<DropTargetCol tasks={this.state.tasksCol5}>
					</DropTargetCol>
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
			type: 'Test',
		}, {
			id: 2,
			title: 'Science',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Lab 4',
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
			title: 'Computer nerwork',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Test',
		}, {
			id: 8,
			title: 'Science',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Lab 4',
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
