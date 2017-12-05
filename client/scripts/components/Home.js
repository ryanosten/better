import React from 'react';
import FeedbackList from './feedback/FeedbackList';
import GroupSelect from './groups/GroupSelect';
import CreateGroup from './groups/CreateGroup';
import Nav from './Nav';
import Login from './Login';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null,
			groupList: [],
			feedbackList:[],
			selectedGroup: null,
		}
		
		this.initializeFeedbackList = this.initializeFeedbackList.bind(this);
		this.filterFeedback = this.filterFeedback.bind(this);
		this.initializeGroupList = this.initializeGroupList.bind(this);
		this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
		this.userLoggedIn = this.userLoggedIn.bind(this);

	};

	updateSelectedGroup(selectedGroup) {
		this.setState({ selectedGroup });
	}

	initializeGroupList(groupList) {
		this.setState({ groupList });
	}

	initializeFeedbackList(feedbackList) {
		this.setState({ feedbackList })
	}

	filterFeedback() {
		const selectedGroup = this.state.selectedGroup;
		const feedbackList = this.state.feedbackList;
		if (selectedGroup === null) {
			return feedbackList;
		}

		const selectedGroupId = selectedGroup.map(item => item._id);
		const filteredFeedbackList = feedbackList.filter(item => selectedGroupId.includes(item.group._id));
		
		return filteredFeedbackList;
	}

	componentDidMount() {
		fetch('/api/me')
			.then(res => res.json)
			.then((user) => {
				if(user =! null) {
					this.userLoggedIn(user)
			}
		})
	}

	userLoggedIn(user) {
		this.setState({ user }, this.refresh)
	}


	render() {
		if(this.state.user) {

			const feedback = this.filterFeedback();

			return (
				<div className="main-container">
					<GroupSelect updateSelectedGroup={this.updateSelectedGroup} initializeGroupList={this.initializeGroupList} groupList={this.state.groupList} selectedGroup={this.state.selectedGroup} />
					<FeedbackList initializeFeedbackList={this.initializeFeedbackList} feedbackList={ feedback } />	
				</div>
			)
		} else {
			return <Login onLogin={this.userLoggedIn} />
		}		
	};
};

export default Home;