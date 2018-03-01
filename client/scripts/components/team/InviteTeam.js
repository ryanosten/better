import React from 'react';
import MultiSelect from './MultiSelect';

class InviteTeam extends React.Component {
	
	constructor(){
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			admin: 'true',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})

		// if(e.target.name == 'admin') {
		// 	console.log('admin')
		// 	if(e.target.value == 'true'){
		// 		this.setState({
		// 			[e.target.name]: e.target.value
		// 		})
		// 	} else {
		// 		this.setState({
		// 			[e.target.name]: e.target.value
		// 		})
		// 	}
		// }
	}

	handleSubmit(e) {
		e.preventDefault()

		const newUser = Object.assign({}, this.state)
		
		fetch(`/api/users/invite`, {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => console.log(res))
	}

	render(){
		return(
			<form className="form-inline invite-team" onSubmit={this.handleSubmit}>
			  <div className="form-group mb-2">
			    <input type="text" className="form-control" name="firstName" placeholder="First name" onChange={this.handleChange} value={this.state.firstName} />
			  </div>
			  <div className="form-group mx-sm-3 mb-2">
			    <input type="text" className="form-control" name="lastName" placeholder="Last name" onChange={this.handleChange} value={this.state.lastName}/>
			  </div>
			  <div className="form-group mb-2">
			    <input type="text" className="form-control" name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
			  </div>
			  <MultiSelect groups={this.props.groups}/>
	  		<button type="submit" className="btn btn-primary mb-2 invite-btn">Send Invite</button>
			</form>
		)
	}
}

export default InviteTeam;