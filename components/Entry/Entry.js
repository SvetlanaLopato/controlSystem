import './Entry.css';
import React from 'react';

import LogIn from '../LogIn/LogIn';

export default class Entry extends React.Component {
	render() {
		return (
			<div className="entry">
				<div className="left-side"></div>
				<div className="right-side">
					<LogIn />
				</div>
			</div>
		);
	}
}