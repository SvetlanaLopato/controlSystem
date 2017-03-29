import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Entry from './components/Entry/Entry';
import Directory from './components/Directory/Directory';
import List from './components/List/List';
import Board from './components/Board/Board';
import Frame from './components/Frame/Frame';
import Example from './components/Example/Example';

ReactDOM.render(( 
		<Router history={browserHistory}>
			<Route path="/" component={Frame}>
				<IndexRoute component={Entry} />
				<Route path="directory" component={Directory} />
				<Route path="list" component={List} />
				<Route path="board/:id" component={Board} />
			</Route>
		</Router>
		/*<Example />*/
	),
	document.getElementById('app')
);
