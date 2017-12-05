import React from 'react';
import Comments from '../comments/Comments';
import Alert from 'react-s-alert';
import queryString from 'query-string';

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
		this.showAlert = this.showAlert.bind(this);
	}

	render(){
		return (
			<div className="main-container">
				<h4 className="fb-headline">Feedback</h4>
				<p>{this.state.content}</p>
				<h5>Comments</h5>
				<Comments comments={this.state.comments} feedbackId={this.props.match.params.feedbackId} fetchComments={this.fetchFeedbackDetail}/>
				<Alert />
			</div>
		)
	}

	showAlert() {
		this.setState( { showAlert: true });
	}

	componentWillMount() {
		
		const qString = queryString.parse(location.search);

		if(qString.showAlert) {
			console.log('changed state to true');
			this.setState({ showAlert: true });
		} 
	}
	
	componentDidMount() {
		this.fetchFeedbackDetail();
				
		if(this.state.showAlert === true) {
			console.log('show alert')
			Alert.success('Feedback magic made!', {
            position: 'top-right',
            effect: 'scale',
            timeout: 3000
        })
		}
	}

	// componentDidUnmount() {
	// 	this.setState({ showAlert: false });
	// }

	fetchFeedbackDetail() {
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
}

export default FeedbackDetail;

	