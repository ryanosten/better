import React from 'react';
import FeedbackList from './FeedbackList';
import GroupSelect from './GroupSelect';
import CreateGroup from './CreateGroup';
import Nav from './Nav';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			user_id: '',
			groupList: [],
			feedbackList:[],
			selectedGroup:null
		}
		this.initializeFeedbackList = this.initializeFeedbackList.bind(this);
		this.filterFeedback = this.filterFeedback.bind(this);
		this.initializeGroupList = this.initializeGroupList.bind(this);
		this.updateSelectedGroup = this.updateSelectedGroup.bind(this);

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

		const selectedGroupId = selectedGroup.map(item => item._id)
		const filteredFeedbackList = feedbackList.filter(item => selectedGroupId.includes(item.groupId));
		
		return filteredFeedbackList;
	}

	// filterFeedback(selectedGroup) {
	// 	console.log(selectedGroup);
	// 	const selectedGroupIds = selectedGroup.map(item => item._id)
	// 	const filteredFeedbackList = this.state.feedbackList.filter(item => selectedGroupIds.includes(item.groupId));
	// 	this.setState({ feedbackList: filteredFeedbackList});
	// }

	render() {
		const feedback = this.filterFeedback();

		return (
			<div className="home-container">
				<GroupSelect updateSelectedGroup={this.updateSelectedGroup} initializeGroupList={this.initializeGroupList} groupList={this.state.groupList} selectedGroup={this.state.selectedGroup} />
				<FeedbackList initializeFeedbackList={this.initializeFeedbackList} feedbackList={ feedback } />	
			</div>
		)
	};
};

export default Home;