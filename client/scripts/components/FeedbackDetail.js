import React from 'react';
import Comments from './Comments';

//explain match here, can I pass more than just the param from route?
class FeedbackDetail extends React.Component {
	constructor() {
		super()
		this.state = {
			created_at: '',
			author: '',
			content: '',
			comments: [
				{
					commentId: '',
					author: '',
					content: 'comment number 1'
				},
				{
					commentId: '',
					author: '',
					content: 'comment number 2'
				}
			],
		}

		this.fetchFeedbackDetail = this.fetchFeedbackDetail.bind(this);
	}

	render(){
		return (
			<div className="fb-headline">
				<h1>Feedback</h1>
				<p>{this.state.content}</p>
				<Comments comments={this.state.comments} feedbackId={this.props.match.params.feedbackId}/>
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
				const content = json.content;
				this.setState({ content })
				})
	}
}

export default FeedbackDetail;

	