import React from 'react';
import { Link } from 'react-router-dom';

import InviteTeam from './InviteTeam';

const TeamTable = (props) => {
	return (
		<div className='container team-table'>
			<InviteTeam groups={props.groups}/>
			<table className="table">
				<thead>
					<tr>
						<th>First</th>
						<th>Last</th>
						<th>Email</th>
						<th>Groups</th>
						<th>Role</th>
						<th></th>
					</tr>
				</thead>
				{props.teamList.map((member) => {
						return (
							<tr>
								<td>{member.firstName}</td>
								<td>{member.lastName}</td>
								<td>{member.email}</td>
								<td>{member.groups.map((group, i) => {
											return i + 1 < member.groups.length ? group + ', ' : group
									})
								}</td>
								<td>{member.admin ? 'Admin' : ''}</td>
								<td><Link to={`edituser/${member._id}`}>edit</Link></td>
							</tr>
						)
					}
				)}
			</table>
		</div>
	)
}

export default TeamTable;