import React from 'react';

class CreateGroup extends React.Component {
	
	constructor() {
		super();
		this.state = {
			groupName: [],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	};

	handleChange(e) {
		console.log(e);
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		
		const newGroup = Object.assign({}, this.state)
		
		console.log(newGroup);
		
		fetch('/api/groups/create', {
			method: 'POST',
			body: JSON.stringify(newGroup),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	render(){
		
		return(
			<div>
				<h1>Add a Group</h1>
				<form onSubmit={this.handleSubmit}>
					<textarea type="text" onChange={this.handleChange} name="groupName" value={this.state.group} ></textarea>
					<button type="submit">submit</button>
				</form>

			</div>
			
		)
	}
}

export default CreateGroup; 