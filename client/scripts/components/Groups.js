import React from 'react';
import { Link } from 'react-router-dom'

import CreateGroup from './CreateGroup';
import GroupsList from './GroupsList';

class Groups extends React.Component {

	render() {
		return(
			<div>
				<h1>Groups</h1>
				<ul>
					<GroupsList />
				</ul>
				<Link to='/groups/create'>
					<button>Add Group</button>
				</Link>				
			</div>

		)
	}
}

export default Groups;