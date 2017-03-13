import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class Q extends React.Component {
	constructor() {
		super();
		this.state = { arr: [], arrInit: ['Banana', 'Saea', 'dfds'] };
	}

	// clique = () => {
	// 	this.setState((state) => {
	// 		state.myObj.name = 'Sveta';
	// 		return state;
	// 	});
	// }

	// render() {
	// 	return (
	// 		<div>
	// 			<h1>This is Q</h1>
	// 			<div>{this.state.myObj.name}</div>
	// 			<div onClick={this.clique}>Clique</div>
	// 		</div>
	// 	);
	// }

	render() {
        return (<div>
            <ul>
            	{this.state.arrInit.map((i, index) => <Draggable type="fruit" data={i} key={index}><li>{i}</li></Draggable>)}
                {/*<Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
                <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
                <Draggable type="metal" data="silver"><li>Silver</li></Draggable>*/}
            </ul>
	            <Droppable style={{width: '100%', height: '100px', border: '1px solid red'}}
	                types={['fruit']} // <= allowed drop types 
	                onDrop={this.onDrop.bind(this)}>
	                <ul>{this.state.arr}</ul>
	            </Droppable>
        </div>);
    }
    onDrop(data) {
        console.log(data);
        this.setState({ arr: [...this.state.arr, <li key={data.fruit}>{data.fruit}</li>]})
        console.log(this.state.arrInit.findIndex((i) => i === data.fruit));
        this.setState((state) => {
        	state.arrInit.splice(state.arrInit.findIndex((i) => i === data.fruit), 1);
        	return state;
        });
        // => banana  
    }
}

