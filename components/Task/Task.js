import './Task.less';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';
import { Modal } from 'react-bootstrap';
import Comments from '../Comments/Comments';
import dataBaseService from '../../dataBaseService';

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
	constructor(props) {
		super(props);
		this.state = {
			showComments: false,
			editLink: false,
			link: this.props.task.link,
		}
	}

	showComments = () => {
		this.setState({ showComments: true });
	}

	closeCommentsModal = () => {
		this.setState({ showComments: false });
	}

	editLink = () => {
		this.setState({ editLink: true });
	}

	closeLinkModal = () => {
		this.setState({ editLink: false });
	}

	saveLink = () => {
		const newLink = document.getElementById('new-link').value.trim();

		dataBaseService.editTaskProperty(this.props.task.id, 'link', newLink);

		this.setState({ editLink: false, link: newLink });
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
				<div className="external-link ellipsis">Link:
					{
						this.state.link ?
						<i className="fa fa-pencil edit-icon" onClick={this.editLink}></i> :
						<i className="fa fa-plus plus-icon" onClick={this.editLink}></i>
					}
					{
						this.state.link && <a href={this.state.link}>{this.state.link}</a>
					}
				</div>
				<div>Deadline: {task.deadline}</div>
				<div className="modal-container">
					<Modal
						show={this.state.editLink}
						onHide={this.closeLinkModal}
						container={this}
					>
						<Modal.Header closeButton>
							<Modal.Title>Edit external link</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>This link should refer to materils connected with current task.</p>	
							<label>Link:</label>
							<input
								id="new-link"
								className="link-input"
								defaultValue={this.state.link}
								type="text"
							/>
						</Modal.Body>
						<Modal.Footer>
							<div className="save-button" onClick={this.saveLink}>Save</div>
						</Modal.Footer>
					</Modal>
				</div>
				<i className="fa fa-comment comment-icon"></i>
				<span className="comments" onClick={this.showComments}>{commentsText}</span>
				<div className="modal-container">
					<Modal
						show={this.state.showComments}
						onHide={this.closeCommentsModal}
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
