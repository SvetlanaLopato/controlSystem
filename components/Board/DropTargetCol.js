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
		task = monitor.getItem();
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

class DropTargetCol extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}
	render() {
		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div className="drop-target-col">
				{
					// this.state.tasks.map((task, index) => 
					// 	<Task task={task} key={index} />
					// )
				}
			</div>
		);
	}
}

export default DropTarget(Types.targetCol, colSource, collect)(DropTargetCol);