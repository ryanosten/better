import React from 'react';
import Field from './Field';

class LoginUser extends React.Component {
	constructor() {
		super()
		this.state = {
			email: '',
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
			<div className='loginUser'>
				<h2>Login User</h2>
				<form onSubmit={this.handleSubmit}>
					<Field
              type="email"
              name="email"
              label="Enter your email: "
              value={this.state.email}
              onChange={this.handleChange}
          />
          <Field
              type="password"
              name="password"
              label="Enter your password: "
              value={this.state.password}
              onChange={this.handleChange}
          />
          <button>Login User</button>
				</form>
			</div>
		)
	}
}

export default LoginUser;