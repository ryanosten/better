import React from 'react';

class NewComment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			authorId: '',
			content: '',
			createdAt: Date.now(),
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const commentItem = Object.assign({}, this.state)

		commentItem.createdAt = Date.now();
		
		fetch(`/api/comment/create/${this.props.feedbackId}`, {
			method: 'POST',
			body: JSON.stringify(commentItem),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	handleChange(e) {
		let content = e.target.value;

		this.setState({ content })
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input type="text" onChange={this.handleChange} name='content' value={this.state.content}/>
				<button type="submit">submit</button>
			</form>
		)
	}
}

export default NewComment;

