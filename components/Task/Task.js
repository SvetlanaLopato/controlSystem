import './Task.less';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';
import { Modal } from 'react-bootstrap';
import Comments from '../Comments/Comments';

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
	constructor() {
		super();
		this.state = {
			show: false,
		}
	}

	handleClick = () => {
		this.setState({ show: true })
	}

	close = () => {
		this.setState({ show: false })
	}

	render() {
		const { connectDragSource, task } = this.props;
		const commentsLength = task.comments.length;

		let commentsText = commentsLength === 1 ? 'Show 1 comment' :
						   commentsLength > 1 ? 'Show ' + commentsLength + ' comments' :
						   'Add commment';

		return connectDragSource(
			<div className="task">
				<h4 className="title">{task.title}</h4>
				<h5 className="name">{task.name}</h5>
				<p className="type">{task.type}</p>
				<div className="deadline">Deadline: {task.deadline}</div>
				<i className="fa fa-comment comment-icon"></i>
				<span className="comments" onClick={this.handleClick}>{commentsText}</span>
				<div className="modal-container">
					<Modal
						show={this.state.show}
						onHide={this.close}
						container={this}
					>
						<Modal.Header closeButton>
							<Modal.Title>Comments</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Comments comments={task.comments} taskId={task.id} />
						</Modal.Body>
					</Modal>
				</div>
			</div>
		);
	}
}

export default DragSource(Types.task, taskSource, collect)(Task);
