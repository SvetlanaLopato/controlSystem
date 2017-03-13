import React from 'react';
import './Frame.css';

export default class Frame extends React.Component {
	render() {
		return (
			<div className="frame">{this.props.children}</div>
		);
	}
}