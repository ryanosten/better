import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackItem = (props) => {
	const feedbackId = props.feedbackId;
	return (
		<li onClick={props.showFeedbackDetail}>
			<Link to={`/feedback/${feedbackId}`}>{props.content}</Link>
		</li>
	)
}

export default FeedbackItem;