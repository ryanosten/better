import React from 'react';
import FeedbackItem from './FeedbackItem';

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
		this.props.onFetchFeedback(feedbackList)
	}

	render() {
		return (
			<div>
				<h1>Feedback Activity</h1>
				<ul>
				{this.props.feedbackList.map(item => <FeedbackItem key={item._id} feedbackId={item._id} content={item.content} />)} 
				</ul>
			</div>
		)
	}
}

export default FeedbackList;