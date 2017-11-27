import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			groupId: this.props.match.params.groupId,
			author: '',
			createdAt: Date.now(),
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
		
		const feedbackItem = Object.assign({}, this.state)

		feedbackItem.createdAt = Date.now(); 
		
		fetch(`/api/feedback/create`, {
			method: 'POST',
			body: JSON.stringify(feedbackItem),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			return res.json()
		}).then(json => {
			this.props.history.push(`/feedback/${json._id}`);

			//create an alert
			let successAlert = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
						successAlert += "<strong>Feedback successfully created!</strong>"
			  		successAlert += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			    	successAlert += "<span aria-hidden='true'>&times;</span></button></div>"

			$('.fb-headline').prepend(successAlert);

			setTimeout(function() {
				$('.alert').remove()
			}, 3000)
		})
	}

	render() {

		return(
			<div>
				<h1>Leave Some Feedback</h1>
				<form onSubmit={this.handleSubmit}>
					<textarea type="text" onChange={this.handleChange} name="content" value={this.state.content} ></textarea>
					<button type="submit">submit</button>
				</form>
			</div>
			
		)
	}
}

export default CreateFeedback;