import React from 'react';
import FeedbackList from './FeedbackList';
import GroupsFilter from './GroupsFilter';
import CreateGroup from './CreateGroup';
import Nav from './Nav';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			feedback: [],
			user_id: '',
			groups: []
		}
		this.fetchFeedback = this.fetchFeedback.bind(this);
		this.fetchGroups = this.fetchGroups.bind(this);

	};

	render() {
		return (
			<div>
				<GroupsFilter groups={this.state.groups} />
				<FeedbackList feedback={this.state.feedback} fetchFeedback={this.fetchFeedback} showFeedbackDetail={this.showFeedbackDetail}/>	
			</div>
		)
	};

	componentDidMount() { 
		this.fetchFeedback();
		this.fetchGroups();
	}

	fetchFeedback() {
		fetch('/api/feedback')
			.then(res => res.json())
			.then(json => this.setState({ feedback: json }));
	}

	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.setState({ groups: json })) //how does it know to push json into the groups array		
	}

	showFeedbackDetail() {
		console.log('its clicking!')

	}
};

export default Home;