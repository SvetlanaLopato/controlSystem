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
		const dropedTask = monitor.getItem();

		return {
			dropedTask: dropedTask,
			isDroped: true,
			newTaskState: component.props.colState,
		};
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		dropedTask: monitor.getDropResult() && monitor.getDropResult().dropedTask,
		isDroped: monitor.getDropResult() && monitor.getDropResult().isDroped,
		isOver: monitor.isOver(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    newTaskState: monitor.getDropResult() && monitor.getDropResult().newTaskState,
	}
}

class DropTargetCol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks || [],
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isDroped && nextProps.dropedTask.state !== nextProps.newTaskState) {
			if (nextProps.dropedTask.state === nextProps.colState) {
				this.removeTask(nextProps.dropedTask);
			}

			if (nextProps.newTaskState === nextProps.colState) {
				const copyDropedTask = Object.assign({}, nextProps.dropedTask);

				this.addTask(copyDropedTask);
			}
		}

	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.props.isDroped) {
			return false;
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
		console.log('remove');
		const dropedTaskIndex = this.state.tasks.findIndex(task => task.id === dropedTask.id);

		this.setState(state => {
			state.tasks.splice(dropedTaskIndex, 1);
			return state;
		});
	}

	addTask = (newTask) => {
		console.log('add');
		newTask.state = this.props.colState;

		this.setState(state => {
			state.tasks.push(newTask);
			return state;
		});
	}
}

export default DropTarget(Types.targetCol, colSource, collect)(DropTargetCol);