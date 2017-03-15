import React from 'react';
import { Link } from 'react-router';

import './Task.css';

export default class Task extends React.Component {
	render() {
		return (
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
