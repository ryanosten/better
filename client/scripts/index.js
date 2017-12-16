import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Nav from './components/Nav';
import CreateUser from './components/CreateUser';
import LoginUser from './components/LoginUser';
import Home from './components/Home';
import Groups from './components/groups/Groups';
import CreateGroup from './components/groups/CreateGroup';
import FeedbackDetail from './components/feedback/FeedbackDetail';
import CreateFeedback from './components/feedback/CreateFeedback';
import GenerateLink from './components/GenerateLink';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
		user: null,
		loggedIn: false,	
		}	
		this.login = this.login.bind(this);
		this.refresh = this.refresh.bind(this);
		this.logout = this.logout.bind(this);
	}


	login() {
		this.setState({
			loggedIn: true,
		})
	}

	logout() {
		fetch('/api/logout', {
			method: 'GET',
			credentials: 'include',
		})
		.then(() => {
			this.setState({
				loggedIn: false,
				user: null,
			});
		});
	}

	refresh() {
		fetch('/api/me', {
			method: 'GET',
			credentials: 'include'
		})
		.then((res) =>  {
			return res.json()
		})
		.then((user) => {
			if(user._id){
				this.setState({user: user})
				this.login();
			} 
		})
	}

	componentDidMount() {
		this.refresh();
	}

	render() {

		return(
			<div>
				{this.state.loggedIn ?
					<Router>
						<div>
							<Nav logout={this.logout} />
							<Route exact path='/' component={Home} />
							<Route exact path='/groups' component={Groups} />
							<Route exact path='/groups/create' component={CreateGroup} />
							<Route exact path='/feedback/:feedbackId' component={FeedbackDetail} />
							<Route exact path='/feedback/:organization/:shortId' component={CreateFeedback} />
							<Route exact path='/generate-link' component={GenerateLink}></Route>
						</div>
					</Router> 
				:
					<div>
						<CreateUser />
						<LoginUser refresh={this.refresh} login={this.login} />
					</div>
				}	
			</div>
		)
	}
}

render(<App/>, document.getElementById('app'));

