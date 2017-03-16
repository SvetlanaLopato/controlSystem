import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Item from './Item';
import Square from './Square';

const style = {
	width: '100%',
	background: '#c0bebe',
	height: '800px',
}

class Card extends React.Component {
	render() {
		const { text } = this.props;
		const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
		return (
			<div style={style}>
				<Square>
				{
					items.map(item => <Item item={item} key={item.id} />)
				}
				</Square>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Card);