import React from 'react';

const FeedbackItem = (props) => {

	return (
		<li onClick={props.showFeedbackDetail}>{props.content}</li>
	)
}

export default FeedbackItem;