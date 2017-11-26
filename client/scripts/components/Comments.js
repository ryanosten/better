import React from 'react';
import CommentItem from './CommentItem.js'
import CreateComment from './CreateComment.js'

const Comments = (props) => {
		
	return(
		<div>
			{props.comments.map(item => <CommentItem key={item._id} content={item.content} />)}
			<CreateComment feedbackId={props.feedbackId} fetchComments={props.fetchComments}/>
		</div>
	)
}

export default Comments;