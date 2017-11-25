import React from 'react';
import CommentItem from './CommentItem.js'
import NewComment from './NewComment.js'

const Comments = (props) => {
		
	return(
		<div>
			{props.comments.map(item => <CommentItem key={item.content} content={item.content} />)}
			<NewComment feedbackId={props.feedbackId}/>
		</div>
	)
}

export default Comments;