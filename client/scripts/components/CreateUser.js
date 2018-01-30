import React from 'react';
import Field from './Field';

class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			role: '',
			shortId: this.props.shortId,
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
			this.props.refresh();
		})
		.then(() => {
			this.props.signUpSuccess();
		})
	}

	componentDidMount() {
		this.props.role == 'feedbacker' ? this.setState({ role: 'feedbacker'}) : null
	}

	render() {
		return (
			<div>
				<form className="form-group create-acct-form" onSubmit={this.handleSubmit}>
				<h4>Create Account</h4>
				{this.props.role == 'feedbacker' ? <p>Be sure to pick an anonymous username and remember your password. Because you are anonymous you have no way to reset your password!</p> : null }
					<Field
						type={this.props.role == 'feedbacker' ? 'text' : 'email'}
						name="username"
						placeholder={this.props.role == 'feedbacker' ? this.props.login : 'email'}
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<Field 
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					{this.props.role !== 'feedbacker' ?
						<button className="btn btn-outline-success create-acct-btn">Create Account</button>

						:

						<button className="btn btn-outline-success">Create Anonymous Account</button>
					}
					
				</form>
			</div>
		)
	}
}

export default CreateUser;