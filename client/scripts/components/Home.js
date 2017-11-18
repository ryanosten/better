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
			selectedGroup:[]
		}
		this.handleFetchFeedback = this.handleFetchFeedback.bind(this);
		// this.fetchGroups = this.fetchGroups.bind(this);
		this.handleFetchGroups = this.handleFetchGroups.bind(this);
		this.handleSelectGroup = this.handleSelectGroup.bind(this);

	};

	handleSelectGroup(selectedGroup) {
		this.setState({ selectedGroup });
	}

	handleFetchGroups(groupList) {
		this.setState({ groupList });
	}

	handleFetchFeedback(feedbackList) {
		this.setState({ feedbackList })
	}

	render() {
		return (
			<div>
				<GroupSelect onSelectGroup={this.handleSelectGroup} onFetchGroups={this.handleFetchGroups} groupList={this.state.groupList} selectedGroup={this.state.selectedGroup} />
				<FeedbackList onFetchFeedback={this.handleFetchFeedback }groupName={this.state.groupName} onGroupChange={this.onGroupChange} feedbackList={this.state.feedbackList}/>	
			</div>
		)
	};

	// componentDidMount() { 
	// 	this.fetchFeedback();
	// 	this.fetchGroups();
	// }
};

export default Home;