import React from 'react';
import { Link } from 'react-router-dom'

import CreateGroup from './CreateGroup';
import GroupList from './GroupList';

class Groups extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.user._id,
			groups: []
		}
		this.fetchGroups = this.fetchGroups.bind(this);
	}

	fetchGroups() {
		fetch(`/api/groups/${this.state.user}`)
			.then(res => res.json())
			.then(json => this.setState({ groups: json })) 		
	}

	componentDidMount() {
		this.fetchGroups();
	}

	render() {
		return(
			<div className="main-container">
				<h4 className="headline">Groups</h4>
				<GroupList groups={this.state.groups} />
				<Link to='/groups/create'>
					<button className="btn btn-primary">Add Group</button>
				</Link>				
			</div>

		)
	}
}

export default Groups;