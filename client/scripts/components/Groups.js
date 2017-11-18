import React from 'react';
import { Link } from 'react-router-dom'

import CreateGroup from './CreateGroup';
import GroupList from './GroupList';

class Groups extends React.Component {
	constructor() {
		super();
		this.state = {
			groups: []
		}
		this.fetchGroups = this.fetchGroups.bind(this);
	}

	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.setState({ groups: json })) //how does it know to push json into the groups array		
	}

	componentDidMount() {
		this.fetchGroups();
	}

	render() {
		return(
			<div>
				<h1>Groups</h1>
				<ul>
					<GroupList groups={this.state.groups} />
				</ul>
				<Link to='/groups/create'>
					<button>Add Group</button>
				</Link>				
			</div>

		)
	}
}

export default Groups;