import React from 'react';
import InviteTeam from './InviteTeam';
import TeamTable from './TeamTable';


class Team extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user._id,
			teamList: []
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

	componentDidMount() {
		this.getTeam();
	}

	render() {
		return (
			<div>
				<TeamTable teamList={this.state.teamList}/>
			</div>
		)
	}
}

export default Team;