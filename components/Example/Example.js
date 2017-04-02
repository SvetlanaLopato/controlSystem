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
	// getClassNames() {
	//     return classNames({
	//         'red':  true,
	//     });
	// }

	render() {
		const { text } = this.props;
		const items = [{ id: 1, check: true, }, { id: 2, check: false, }, { id: 3, check: true, }, { id: 4 }];
		return (
			<div style={style} >
				<Square>
				{
					items.map(item => <Item item={item} key={item.id} />)
				}
				</Square>
				{items[2].check && <h2>Sveta</h2>}
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Card);