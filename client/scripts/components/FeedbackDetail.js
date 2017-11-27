import React from 'react';
import Comments from './Comments';

//explain match here, can I pass more than just the param from route?
class FeedbackDetail extends React.Component {
	constructor() {
		super()
		this.state = {
			createdAt: '',
			author: '',
			content: '',
			comments: [],
		}

		this.fetchFeedbackDetail = this.fetchFeedbackDetail.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
	}

	render(){
		return (
			<div className="fb-headline">
				<h1>Feedback</h1>
				<p>{this.state.content}</p>
				<h5>Comments</h5>
				<Comments comments={this.state.comments} feedbackId={this.props.match.params.feedbackId} fetchComments={this.fetchComments}/>
			</div>
		)
	}

	componentDidMount() {
		this.fetchFeedbackDetail();
		this.fetchComments();
	}

	fetchFeedbackDetail() {
		fetch(`/api/feedback/${this.props.match.params.feedbackId}`)
			.then(res => res.json())
			.then(json => {
				console.log(json);
				const content = json.content;
				const createdAt = json.createdAt;
				this.setState({ content })
				this.setState({ createdAt });
				})
	}

	fetchComments() {
		fetch(`/api/comments/${this.props.match.params.feedbackId}`)
			.then(res => res.json())
			.then(json => {
				const comments = json.comments
				this.setState({ comments })
			})
	}
}

export default FeedbackDetail;

	