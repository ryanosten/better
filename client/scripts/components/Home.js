import React from 'react';
import FeedbackList from './feedback/FeedbackList';
import GroupSelect from './groups/GroupSelect';
import CreateGroup from './groups/CreateGroup';
import Nav from './Nav';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import queryString from 'query-string';
import Alert from 'react-s-alert';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			groupList: [],
			feedbackList:[],
			selectedGroup: null,
			showAlert: false,
			feedbackGroup: {},
		}
		
		this.initializeFeedbackList = this.initializeFeedbackList.bind(this);
		this.filterFeedback = this.filterFeedback.bind(this);
		this.initializeGroupList = this.initializeGroupList.bind(this);
		this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.fetchGroups = this.fetchGroups.bind(this);

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

	showAlert() {
		this.setState( { showAlert: true });
	}

	componentWillMount() {
	
		const qString = queryString.parse(location.search);

		if(qString.showAlert) {
			console.log('changed state to true');
			this.setState({ showAlert: true });
		} 

		this.props.loginAlertDisable();
	}

	componentDidMount() {
		if(this.state.showAlert === true) {
			console.log('show alert')
			Alert.success('Feedback magic made!', {
            position: 'top-right',
            effect: 'scale',
            timeout: 3000
        })
		}

		this.fetchGroups();
	}

	fetchGroups() {
		fetch(`/api/groups/${this.state.user._id}`)
			.then(res => res.json())
			.then(json => this.setState({ feedbackGroup: json[0] }) ) 
	}

	render() {

			const feedback = this.filterFeedback();

			return (
				<div className="main-container">
					<Alert />
					<Link to={`/feedback/${this.state.feedbackGroup.shortId}`}><button type="button" className="btn fb-btn">Leave Feedback</button></Link>
					{
						this.state.user.role == 'admin' ? 
						
						<GroupSelect user={this.state.user._id} updateSelectedGroup={this.updateSelectedGroup} initializeGroupList={this.initializeGroupList} groupList={this.state.groupList} selectedGroup={this.state.selectedGroup} /> 

						: null
					
					}
					<FeedbackList user={this.state.user._id} initializeFeedbackList={this.initializeFeedbackList} feedbackList={ feedback } />	
				</div>
			)
	
	};
};

export default Home;