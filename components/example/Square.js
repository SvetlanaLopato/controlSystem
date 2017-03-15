
import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

const style = {
  height: '600px',
  width: '100%',
  background: 'pink',
}

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CHESSPIECE: 'card'
};

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
    console.log('drop', item.id);
    // console.log('**', this)
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  console.log('monitor', monitor.canDrop())
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
  constructor() {
    super();
    this.state = {
      id: null,
    }
  }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props;
    // console.log('this', this);

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='Cell' style={style}>
        
      </div>
    );
  }
}

export default DropTarget(Types.CHESSPIECE, chessSquareTarget, collect)(Square);