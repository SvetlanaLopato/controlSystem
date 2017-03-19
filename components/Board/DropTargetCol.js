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
			// colState: props.colState,
			// dropedTask: {},
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log(this.props, nextProps);
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
		// if (this.props.dropedTask && this.props.dropedTask.state === this.props.newTaskState) {
		// 	return false;
		// }

		return true;
	}

	/*shouldComponentUpdate() {
		// this.setState({ dropedTask: this.props.dropedTask });
		console.log(this.props.newTaskState)
		if (this.props.isDroped && this.state.colState === this.props.newTaskState) {
			// this.setState({ dropedTask: {} });
			// console.log('*', this.state.colState, this.props.newTaskState)
			return false;
		}
		// if (!this.props.isDroped) {
		// 	return false;
		// }
		// console.log('--')
		return true;
	}*/

	componentWillUpdate(nextProps, nextState) {
		console.log('state', nextState)
		// console.log('*');
		// console.log('*', nextProps.dropedTask)
		// if (nextProps.isDroped && nextProps.dropedTask && nextProps.dropedTask.id) {
		// 	const dropedTaskIndex = nextState.tasks.findIndex(task => task.id === nextProps.dropedTask.id);
		// 	if (dropedTaskIndex != -1) {
		// 		this.removeTask(nextProps.dropedTask);
		// 	}
		// }
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

	componentDidUpdate() {
		console.log('updated')
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