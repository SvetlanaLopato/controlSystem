import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './Board.css';

import Task from '../Task/Task';

export default class Board extends React.Component {
	render() {
		let task = {
			title: 'Computer nerwork',
			name: 'Andrey Lukashenko',
			deadline: '18.03.2017',
			type: 'Test',
		};
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
				<div className="col">
					<div className="col-header">Review</div>
				</div>
				<div className="col">
					<div className="col-header">Done</div>
					<Task task={task} />
				</div>
			</div>
		);
	}
}