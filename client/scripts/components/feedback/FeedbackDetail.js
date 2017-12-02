import React from 'react';
import Comments from './comments/Comments';

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
	}

	render(){
		return (
			<div className="main-container">
				<h4 className="fb-headline">Feedback</h4>
				<p>{this.state.content}</p>
				<h5>Comments</h5>
				<Comments comments={this.state.comments} feedbackId={this.props.match.params.feedbackId} fetchComments={this.fetchFeedbackDetail}/>
			</div>
		)
	}

	componentDidMount() {
		this.fetchFeedbackDetail();
	}

	fetchFeedbackDetail() {
		fetch(`/api/feedback/${this.props.match.params.feedbackId}`)
			.then(res => res.json())
			.then(json => {
				console.log(json);
				const content = json.content;
				const createdAt = json.createdAt;
				const comments = json.comments; 
				this.setState({ content });
				this.setState({ createdAt });
				this.setState({ comments });
				})
	}
}

export default FeedbackDetail;

	