import React from 'react';

export default class Q extends React.Component {
	constructor() {
		super();
		this.state = { myObj: { name: 'flower', a: 2 } };
	}

	clique = () => {
		this.setState((state) => {
			state.myObj.name = 'Sveta';
			return state;
		});
	}

	render() {
		return (
			<div>
				<h1>This is Q</h1>
				<div>{this.state.myObj.name}</div>
				<div onClick={this.clique}>Clique</div>
			</div>
		);
	}
}