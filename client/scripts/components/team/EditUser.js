import React from 'react';

class EditUser extends React.Component {
	constructor(props){
		super()
		this.state = {
			user: props.match.params.user,
			firstName: '',
			lastName: '',
			email: '', 
			groups: [],
			admin: false
		}
		this.fetchUser = this.fetchUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.fetchUserGroups = this.fetchUserGroups.bind(this);
	}

	componentDidMount(){
		this.fetchUser();
		this.fetchUserGroups();
	}

	fetchUser(){
		fetch(`/api/user/${this.state.user}`)
			.then(res => res.json())
			.then(json => this.setState({ 
				firstName: json.firstName,
				lastName: json.lastName,
				email: json.email,
				admin: json.admin
			})) 
	}

	fetchUserGroups(){
		fetch(`/api/groups/${this.state.user}`)
			.then(res => res.json())
			.then(json => this.setState({ groups: json }))
	}	

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render(){
		return(
			<div className="main-container">
				<h4>Edit User</h4>
				<form className="form-group" /*onSubmit={this.handleSubmit}*/>
					<div className="form-group row col-sm-6">
						<input className="form-control" type="text" onChange={this.handleChange} name="firstName" value={this.state.firstName} placeholder={this.state.firstName} required/>
					</div>
					<button className="btn btn-primary" type="submit">submit</button>
				</form>
			</div>
		)
	}
}

export default EditUser