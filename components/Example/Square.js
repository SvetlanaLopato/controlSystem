
import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const style = {
  height: '600px',
  width: '100%',
  background: 'pink',
  marginTop: '20px',
}

const style1 = {
  width: '100px',
  height: '100px',
  background: 'yellow',
  display: 'inline-block',
  marginRight: '10px',
}

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CHESSPIECE: 'card'
};

let idList = [];
function addID(id) {
  idList.push(id);
}
/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {
  canDrop(props, monitor) {
    return true;
  },

  hover(props, monitor, component) {
  },

  drop(props, monitor, component) {
    const item = monitor.getItem();
    addID(item.id);
    // console.log('**', this)
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),

    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Square extends React.Component {
  // componentWillReceiveProps(nextProps) {
    // if (!this.props.isOver && nextProps.isOver) {
    //   // You can use this as enter handler
    // }

    // if (this.props.isOver && !nextProps.isOver) {
    //   // You can use this as leave handler
    // }

    // if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
    //   // You can be more specific and track enter/leave
    //   // shallowly, not including nested targets
    // }
  // }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props;
    // console.log('this', this);

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='Cell' style={style}>
      {this.props.children}
        {
          idList.map(id => <div style={style1} key={id}>
            I am a draggable card number {id}
          </div>)
        }
      </div>
    );
  }
}

export default DropTarget(Types.CHESSPIECE, chessSquareTarget, collect)(Square);  