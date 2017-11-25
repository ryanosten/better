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
		}).then(res => { 
			this.props.history.push('/groups')
			
			let successAlert = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
						successAlert += "<strong>Group successfully created!</strong>"
			  		successAlert += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
			    	successAlert += "<span aria-hidden='true'>&times;</span></button></div>"

			$('.group-headline').prepend(successAlert);

			setTimeout(function() {
				$('.alert').remove()
			}, 3000)
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