import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Groups from './components/Groups';
import CreateGroup from './components/CreateGroup';
import FeedbackDetail from './components/FeedbackDetail';
import CreateFeedback from './components/CreateFeedback';
import GenerateLink from './components/GenerateLink'


const Root = () => {
	return (
		<Router>
			<div>
				<Nav />
				<Route exact={true} path='/' component={Home} />
				<Route exact={true} path='/groups' component={Groups} />
				<Route exact={true} path='/groups/create' component={CreateGroup} />
				<Route exact={true} path='/feedback/:feedbackId' component={FeedbackDetail} />
				<Route exact={true} path='/feedback/create/:feedbackId' component={CreateFeedback} />
				<Route exact={true} path='/generate-link' component={GenerateLink}></Route>
			</div>
		</Router> 
	)
}

render(<Root/>, document.getElementById('app'));

