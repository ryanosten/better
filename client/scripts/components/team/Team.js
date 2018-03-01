import React from 'react';
import InviteTeam from './InviteTeam';
import TeamTable from './TeamTable';


class Team extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user._id,
			teamList: [],
			groups: [],
		}
		this.getTeam = this.getTeam.bind(this);
	}

	getTeam(){
		fetch(`/api/team/${this.state.user}`)
			.then(res => res.json())
			.then(json => {
				this.setState({
					teamList: json
				})
			})
	}

	getGroups(){
		fetch(`/api/groups/${this.state.user}`)
			.then(res => res.json())
			.then(json => {
				this.setState({
					groups: json
				})
			})
	}

	componentDidMount() {
		this.getTeam();
		this.getGroups();
	}

	render() {
		return (
			<div>
				<TeamTable teamList={this.state.teamList} groups={this.state.groups}/>
			</div>
		)
	}
}

export default Team;