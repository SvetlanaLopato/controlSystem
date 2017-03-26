import './Task.css';
import React from 'react';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';

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
		// monitor.getDropResult();
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
				<i className="fa fa-comment"></i>
				<Link to="/" className="comments">Show comments</Link>
			</div>
		);
	}
}

export default DragSource(Types.task, taskSource, collect)(Task);
