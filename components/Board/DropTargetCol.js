import React from 'react';
import { DropTarget } from 'react-dnd';

import Task from '../Task/Task';

const Types = {
	targetCol: 'task',
};

const colSource = {
	canDrop(props, monitor) {
		return true;
	},
	
	hover(props, monitor, component) {
	},

	drop(props, monitor, component) {
		const task = monitor.getItem();
		return task;
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		dropedTask: monitor.getDropResult(),
	}
}

class DropTargetCol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks || [],
		}
	}

	shouldComponentUpdate() {
		console.log('droped', this.props.dropedTask)
		if (this.props.dropedTask) {
			this.removeTask(this.props.dropedTask);
		}
		return true;
	}

	render() {
		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div className="drop-target-col">
				{
					this.state.tasks.map((task, index) => 
						<Task task={task} key={index} />
					)
				}
			</div>
		);
	}

	removeTask = (dropedTask) => {
		const dropedTaskIndex = this.state.tasks.findIndex(task => task.id === dropedTask.id);
		if (dropedTaskIndex >= 0) {
			this.setState(state => {
				state.tasks.splice(dropedTaskIndex, 1);
				return state;
			})
		}
		console.log(this.state);
	}
}

export default DropTarget(Types.targetCol, colSource, collect)(DropTargetCol);