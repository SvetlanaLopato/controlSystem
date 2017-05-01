import './Comments.less';
import dataBaseService from '../../dataBaseService';

export default class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.comments,
			needUpdate: false,
		}
	}

	addMessage = () => {
		let messageInfo = {
			author: dataBaseService.getUserProperty('name'),
			message: document.getElementById('new-message').value.trim(),
		};


		if (messageInfo.message) {
			dataBaseService.editTaskProperty(this.props.taskId, 'comments', messageInfo);
			document.getElementById('new-message').value = '';
			this.setState({ needUpdate: true });
		}
	}

	render() {
		return (
			<div>
				<ul className="comments-list">
					{
						this.state.comments.map(comment => {
							let classes = 'comment-author ellipsis ';

							if (dataBaseService.getUserProperty('name') === comment.author) {
								classes = classes + 'curernt-user';
							}

							return (<li key={Math.random()}>
								<span className={classes}>{comment.author}:</span>
								<p className="comment-message">{comment.message}</p>
							</li>);
						})
					} 
				</ul>
				<div className="add-comment">
					<textarea
							id="new-message"
							className="message-input"
							placeholder="Enter the message..."
					/>
					<div className="save-button" onClick={this.addMessage}>Add</div>
				</div>
			</div>
		);
	} 
}