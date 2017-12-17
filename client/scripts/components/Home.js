import React from 'react';
import FeedbackList from './feedback/FeedbackList';
import GroupSelect from './groups/GroupSelect';
import CreateGroup from './groups/CreateGroup';
import Nav from './Nav';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
// import Login from './Login';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user._id,
			groupList: [],
			feedbackList:[],
			selectedGroup: null,
		}
		
		this.initializeFeedbackList = this.initializeFeedbackList.bind(this);
		this.filterFeedback = this.filterFeedback.bind(this);
		this.initializeGroupList = this.initializeGroupList.bind(this);
		this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
		// this.userLoggedIn = this.userLoggedIn.bind(this);

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

	


	render() {
		// if(this.state.user) {

			const feedback = this.filterFeedback();

			return (
				<div className="main-container">
					<GroupSelect user={this.state.user} updateSelectedGroup={this.updateSelectedGroup} initializeGroupList={this.initializeGroupList} groupList={this.state.groupList} selectedGroup={this.state.selectedGroup} />
					<FeedbackList user={this.state.user} initializeFeedbackList={this.initializeFeedbackList} feedbackList={ feedback } />	
				</div>
			)
	
	};
};

export default Home;