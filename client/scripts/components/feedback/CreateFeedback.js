import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			organization: this.props.match.params.organization,
			group: this.props.match.params.group,
			// author: '',
			groupId: '',
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
			
			fetch(`/api/feedback/create/${this.state.organization}/${this.state.group}`, {
				method: 'POST',
				body: JSON.stringify(feedbackItem),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				return res.json()
			}).then(json => {
				this.props.history.push(`/feedback/${json._id}`);
			})
	}
		

			// //create an alert
			// let successAlert = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
			// 			successAlert += "<strong>Feedback successfully created!</strong>"
			//   		successAlert += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			//     	successAlert += "<span aria-hidden='true'>&times;</span></button></div>"

			// $('.fb-headline').prepend(successAlert);

			// setTimeout(function() {
			// 	$('.alert').remove()
			// }, 3000)

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