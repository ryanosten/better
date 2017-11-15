import React from 'react';
import FeedbackItem from './FeedbackItem';

const FeedbackList = (props) => {
	//const feedback = props.fetchFeedback();

	console.log(props);

		return (
			<div>
				<h1>Feedback Activity</h1>
				<ul>
				{props.feedback.map(item => <FeedbackItem key={item._id} feedbackId={item._id} content={item.content} showFeedbackDetail={props.showFeedbackDetail} />)} {/*why do like this, keep passing down to component rather than just make <li> here */}
				</ul>
			</div>
		)
}

export default FeedbackList;