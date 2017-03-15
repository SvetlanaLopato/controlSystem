import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './Board.css';

import Task from '../Task/Task';

export default class Board extends React.Component {
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
				</div>
{/*				<div className="col">
					<div className="col-header">Review</div>
					{
						this.state.tasksCol4.map((task, index) => 
							<Draggable type="task"
									data={task}
									key={task.id}>
									<Task task={task} />
							</Draggable>
						)
					}
				</div>
				<div className="col">
					<div className="col-header">Done</div>
					{
						this.state.tasksCol5.map((task, index) => 
							<Draggable type="task"
									data={task}
									key={task.id}>
									<Task task={task} />
							</Draggable>
						)
					}
					<Droppable style={{width: '100%', height: '100px', border: '1px solid red'}}
							types={['task']} // <= allowed drop types 
							onDrop={this.onDropToCol5}>
					</Droppable>
				</div>*/}
			</div>
		);
	}

	onDropToCol5 = (data) => {
		console.log("data", data);
		this.setState(state => {
			state.tasksCol5 = [...state.tasksCol5, data.task];
			return state;
		});
	}

}

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
		}, {
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
		}];
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
		}, {
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
		}];
