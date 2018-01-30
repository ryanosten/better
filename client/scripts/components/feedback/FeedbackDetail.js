import React from 'react';
import Comments from '../comments/Comments';
import { Link } from 'react-router-dom';

class FeedbackDetail extends React.Component {
	constructor() {
		super()
		this.state = {
			createdAt: '',
			author: '',
			content: '',
			comments: [],
			showAlert: false,
		}

		this.fetchFeedbackDetail = this.fetchFeedbackDetail.bind(this);
	}

	componentDidMount() {
		this.fetchFeedbackDetail();
	}

	fetchFeedbackDetail() {
		console.log('fetchfeedbackDetail' + this.props.match.params.feedbackId)
		fetch(`/api/feedback/${this.props.match.params.feedbackId}`)
			.then(res => res.json())
			.then(json => {
				const content = json.content;
				const createdAt = json.createdAt;
				const comments = json.comments; 
				this.setState({ content });
				this.setState({ createdAt });
				this.setState({ comments });
				})
	}

	render(){

		return (
			<div className="main-container">
				<h4 className="fb-headline">Feedback</h4>
				<p>{this.state.content}</p>
				<h5>Comments</h5>
				<Comments user={this.props.user} comments={this.state.comments} feedbackId={this.props.match.params.feedbackId} fetchComments={this.fetchFeedbackDetail}/>
				{
					this.props.user == null && 
					<p>Create an <Link to={`/getfeedback/`}><a className="create-acct" href="">anonymous account</a></Link> to get management's responses to your feedback!</p>
				}
			</div>
		)
	}
	
}

export default FeedbackDetail;

	