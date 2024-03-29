import React from 'react';
import Field from './Field';

class LoginUser extends React.Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const user = Object.assign({}, this.state)

		fetch('/api/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
		})
		.then((res) => {

			if(res.status !== 401) {
				return res.json()
			} else {
				console.log('Unauthorized request')
			}
		})
		.then((json) => {
			this.props.refresh();
		})
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		return(
			<div>
				<form className="form-group login-form" onSubmit={this.handleSubmit}>
					<h4>Login</h4>
					<Field
              type="email"
              name="username"
              placeholder="Email address"
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
          <button className="btn btn-primary login-btn">Login</button>
				</form>
			</div>
		)
	}
}

export default LoginUser;