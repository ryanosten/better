import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			organization: this.props.match.params.organization,
			shortId: this.props.match.params.shortId,
			// author: '',
			createdAt: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value, 
		});
	}

	handleSubmit(e) {
		e.preventDefault();
			const feedbackItem = Object.assign({}, this.state);
			feedbackItem.createdAt = Date.now(); 
			
			fetch(`/api/feedback/create/${this.state.organization}/${this.state.shortId}`, {
				method: 'POST',
				body: JSON.stringify(feedbackItem),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				return res.json()
			}).then(json => {		
				this.props.history.push(`/feedback/${json._id}?showAlert=true`);
			})
	}

	render() {

		return(
			<div className="main-container col-sm-6">
				<h4>Leave Some Feedback</h4>
				<form className="form-group" onSubmit={this.handleSubmit}>
					<textarea className="form-control fb-txt-area" type="text" onChange={this.handleChange} name="content" value={this.state.content} ></textarea>
					<button className="btn btn-primary" type="submit">submit</button>
				</form>
			</div>
			
		)
	}
}

export default CreateFeedback;