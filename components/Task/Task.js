import React from 'react';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';

import './Task.css';

const Types = {
	task: 'task',
}

const taskSource = {
	beginDrag(props, monitor, component) {
		const { task } = props;
		console.log('start drag', task.id);
		return task;
	},

	endDrag(props, monitor, component) {
		console.log('end drag');
	},
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
	}
}

class Task extends React.Component {
	render() {
		const { connectDragSource } = this.props;

		return connectDragSource(
			<div className="task">
				<h4 className="title">{this.props.task.title}</h4>
				<h5 className="name">{this.props.task.name}</h5>
				<p className="type">{this.props.task.type}</p>
				<div className="deadline">Deadline: {this.props.task.deadline}</div>
				<Link to="/" className="comments">Show comments</Link>
				{/*<span className="arrow">
					<i className=" fa fa-chevron-left arrow-left"></i>
					<i className=" fa fa-chevron-right arrow-right"></i>
				</span>*/}
			</div>
		);
	}
}

export default DragSource(Types.task, taskSource, collect)(Task);
