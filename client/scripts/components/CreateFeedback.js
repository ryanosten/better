import React from 'react';

class CreateFeedback extends React.Component {
	constructor() {
		super();
		this.state = {
			content: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value, //why do I need square brackets around key? //how can I reuse handlechange?
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		
		const feedbackItem = Object.assign({}, this.state)
		
		console.log(feedbackItem);
		
		fetch('/api/feedback/create', {
			method: 'POST',
			body: JSON.stringify(feedbackItem),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		//when submit feedback, write to database, then database will pass down to state
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