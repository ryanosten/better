import React from 'react';

//explain match here, can I pass more than just the param from route?
class FeedbackDetail extends React.Component {
	constructor() {
		super()
		this.state = {
			created_at: '',
			author: '',
			content: '',
			comments: [],
		}

		this.fetchFeedbackDetail = this.fetchFeedbackDetail.bind(this);
	}

	render(){
		return (
			<div>
				<h1>Feedback</h1>
				<p>{this.state.content}</p>
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

	