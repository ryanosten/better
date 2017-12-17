import React from 'react';
import Field from './Field';

class CreateUser extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e){
		e.preventDefault();

		const user = Object.assign({}, this.state);

		fetch('/api/signup', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then((res) => res.json())
		.then((json) => {
			console.log(json)
			//this.props.refresh();
		});
	}

	render() {
		return (
			<div className='createUser'>
				<h2>Create User</h2>
				<form onSubmit={this.handleSubmit}>
					<Field
						type="email"
						name="email"
						label="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<Field 
						type="password"
						name="password"
						label="Password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<button>Create User</button>
				</form>
			</div>
		)
	}
}

export default CreateUser;