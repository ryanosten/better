import React from 'react';

class CreateComment extends React.Component {

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
		
		fetch(`/api/comments/create/${this.props.feedbackId}`, {
			method: 'POST',
			body: JSON.stringify(commentItem),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			this.props.fetchComments();
			this.setState({ content: '' })
		})
	}

	handleChange(e) {
		let content = e.target.value;

		this.setState({ content })
	}

	render() {
		return(
			<form  onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input className="form-control" type="text" onChange={this.handleChange} name='content' value={this.state.content} placeholder="Your comment"/>
				</div>
				<button className="btn btn-outline-dark btn-sm" type="submit">comment</button>
			</form>
		)
	}
}

export default CreateComment;

