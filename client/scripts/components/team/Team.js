import React from 'react';
import InviteTeam from './InviteTeam';
import TeamTable from './TeamTable';

class Team extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user._id,
			teamList: [
				{
					firstName: 'John',
					lastName: 'Connor',
					email: 'jc@gmail.com',
					admin: false,
					groups:[]
				},
				{
					firstName: 'Jesse',
					lastName: 'Barfield',
					email:'jb@gmail.com',
					admin: true,
					groups:[]
				}
			]
		}
		this.getTeam = this.getTeam.bind(this);
	}

	getTeam(){
		//make API call to get users
		//add to state
	}

	render() {
		return (
			<div>
				<InviteTeam/>
				<TeamTable teamList={this.state.teamList}/>
				<p> Users!!</p>
			</div>
		)
	}
}

export default Team;