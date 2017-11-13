import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Groups from './components/Groups';
import CreateGroup from './components/CreateGroup';


const Root = () => {
	return (
		<Router>
			<div>
				<Nav />
				<Route exact={true} path="/" component={Home} />
				<Route exact={true} path='/groups' component={Groups} />
				<Route exact={true} path='/groups/create' component={CreateGroup} />
			</div>
		</Router> 
	)
}

render(<Root/>, document.getElementById('app'));

///* why closing tag on </BrowserRouter?, other components self-closing?*/

