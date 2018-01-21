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
import Team from './components/team/Team';
import EditUser from './components/team/EditUser';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
		user: null,
		loggedIn: false,
		path: window.location.pathname.substr(1,8),	
		loginAlert: false
		}	
		this.login = this.login.bind(this);
		this.refresh = this.refresh.bind(this);
		this.logout = this.logout.bind(this);
		this.signUpSuccess = this.signUpSuccess.bind(this)
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
				this.setState({
					user: user
				})
				this.login();
			} 
		})
	}

	signUpSuccess() {
		this.setState({ loginAlert: true })
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
							<Nav user={this.state.user} logout={this.logout} />
							<Route exact path='/' render={(props) => <Home user={this.state.user} {...props} />}/>
							<Route exact path='/team' render={(props) => <Team user={this.state.user} {...props} />}/>
							<Route exact path='/groups' render={(props) => <Groups user={this.state.user} {...props} />}/>
							<Route exact path='/groups/create' render={(props) => <CreateGroup user={this.state.user} {...props} />}/>
							<Route exact path='/getfeedback/:feedbackId' render={(props) => <FeedbackDetail user={this.state.user} {...props} />}/>
							<Route exact path='/feedback/:shortId' render={(props) => <CreateFeedback user={this.state.user} loginAlert={this.state.loginAlert} signUpSuccess={this.signUpSuccess} {...props} />}/>
							<Route exact path='/generate-link' component={GenerateLink}></Route>
							<Route exact path='/edituser/:user' component={EditUser}></Route>
						</div>
					</Router> 
				:
				((this.state.path === 'feedback') ? (
						<Router>
							<div>
								<Route exact path='/getfeedback/:feedbackId' render={(props) => <FeedbackDetail user={this.state.user} {...props} />}/>
								<Route exact path='/feedback/:shortId' render={(props) => <CreateFeedback refresh={this.refresh} user={this.state.user} loginAlert={this.state.loginAlert} signUpSuccess={this.signUpSuccess} {...props} />}/>
							</div>
						</Router>
					)

					:
					(
						<div>
							<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
								<a href="/" className="navbar-brand">Better</a>
							</nav>
							<div className="container">
								<LoginUser refresh={this.refresh} login={this.login} />
								<CreateUser refresh={this.refresh} loginAlert={this.state.loginAlert} signUpSuccess={this.signUpSuccess} />
							</div>
						</div>
					)
				)
					
				}	
			</div>
		)
	}
}

render(<App/>, document.getElementById('app'));

