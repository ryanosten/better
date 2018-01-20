import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FeedbackItem = (props) => {
	const feedbackId = props.feedbackId;
	const time = moment(props.createdAt).local().format('MMM DD HH:mm:ss');
	return (
		<div>
			<li className="fb-item" onClick={props.showFeedbackDetail}>
				<p className="fb-group">{props.groupName}<span className="fb-time">{time}</span></p>
				<Link className="fb-anchor" to={`/getfeedback/${feedbackId}`}>{props.content}</Link>
			</li>
		</div>
	)
}

export default FeedbackItem;