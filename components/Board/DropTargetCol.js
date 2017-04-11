import { DropTarget } from 'react-dnd';

import dataBaseService from '../../dataBaseService';
import Task from '../Task/Task';

const Types = {
	targetCol: 'task',
};

const colSource = {
	canDrop(props, monitor) {
		return true;
	},
	
	hover(props, monitor, component) {
		// const isJustOverThisOne = monitor.isOver({ shallow: true });
		// console.log('hover', isJustOverThisOne);
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
		// isOver: monitor.isOver(),
	    isOverCurrent: monitor.isOver({ shallow: true }),
	    newTaskState: monitor.getDropResult() && monitor.getDropResult().newTaskState,
	}
}

class DropTargetCol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: props.tasks || [],
			// isOverCurrent: props.isOverCurrent,
		}
	}

	componentWillUpdate() {
		if (this.props.isDroped && this.props.dropedTask.state !== this.props.newTaskState) {
			if (this.props.dropedTask.state === this.props.colState) {
				this.removeTask(this.props.dropedTask);
			}

			if (this.props.newTaskState === this.props.colState) {
				const copyDropedTask = Object.assign({}, this.props.dropedTask);

				this.addTask(copyDropedTask);
				dataBaseService.editState(this.props.dropedTask.id, this.props.colState);
			}
		}
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

	render() {
		const { connectDropTarget, isOverCurrent } = this.props;
	
		return connectDropTarget(
			<div className="drop-target-col">
				{
					this.state.tasks.map((task, index) => 
						<Task task={task} key={index} />
					)
				}
				{isOverCurrent && <div className="hover-tip"></div>}
			</div>
		);
	}
}

export default DropTarget(Types.targetCol, colSource, collect)(DropTargetCol);