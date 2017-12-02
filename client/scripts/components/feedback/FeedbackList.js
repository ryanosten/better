import React from 'react';
import FeedbackItem from './feedback/FeedbackItem';

class FeedbackList extends React.Component {
	constructor(props) {
		super(props);
		this.fetchFeedback = this.fetchFeedback.bind(this);
		this.handleFetchFeedback = this.handleFetchFeedback.bind(this);
	}

	fetchFeedback() {
		fetch('/api/feedback')
			.then(res => res.json())
			.then(json => this.handleFetchFeedback(json));
	}

	componentDidMount() {
		this.fetchFeedback();
	}

	handleFetchFeedback(feedbackList) {
		this.props.initializeFeedbackList(feedbackList)
	}

	render() {

		const sortedFeedback = this.props.feedbackList.sort((a,b) => {
			return (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0);
		
		});

		return (
			<div className="fb-container">
				<h4 className="headline">Your Feedback</h4>
				<ul className="fb-list">
				{sortedFeedback.map(item => <FeedbackItem key={item._id} feedbackId={item._id} content={item.content} createdAt={item.createdAt} groupName={item.group.name} />)} 
				</ul>
			</div>
		)
	}
}

export default FeedbackList;