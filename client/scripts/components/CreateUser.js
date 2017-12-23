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
			<div>
				<form className="form-group create-acct-form" onSubmit={this.handleSubmit}>
				<h4>Create Account</h4>
					<Field
						type="email"
						name="email"
						placeholder="Email address"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<Field 
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<button className="btn btn-outline-success create-acct-btn">Create Account</button>
				</form>
			</div>
		)
	}
}

export default CreateUser;