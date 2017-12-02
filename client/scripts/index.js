import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Groups from './components/groups/Groups';
import CreateGroup from './components/groups/CreateGroup';
import FeedbackDetail from './components/feedback/FeedbackDetail';
import CreateFeedback from './components/feedback/CreateFeedback';
import GenerateLink from './components/GenerateLink'
import Users from './components/Users';


const Root = () => {
	return (
		<Router>
			<div>
				<Nav />
				<Route exact path='/' component={Home} />
				<Route exact path='/groups' component={Groups} />
				<Route exact path='/groups/create' component={CreateGroup} />
				<Route exact path='/users' component={Users} />
				<Route exact path='/feedback/:feedbackId' component={FeedbackDetail} />
				<Route exact path='/feedback/create/:groupId' component={CreateFeedback} />
				<Route exact path='/generate-link' component={GenerateLink}></Route>
			</div>
		</Router> 
	)
}

render(<Root/>, document.getElementById('app'));

