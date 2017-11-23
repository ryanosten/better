import React from 'react';
import { Redirect } from 'react-router-dom';

class CreateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			groupId: '5a08cd68732a5d80f7c27951',
			groupName: 'sales'
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
		
		fetch(`/api/feedback/create/${this.props.match.params.groupId}`, {
			method: 'POST',
			body: JSON.stringify(feedbackItem),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			return res.json()
		}).then(json => {
			window.location = `/feedback/${json._id}`;
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