import React from 'react';
// import TeamMember from './TeamMember';

const TeamTable = (props) => {
	return (
		<div>
			<table>
				<tr>
					<th>First</th>
					<th>Last</th>
					<th>Email</th>
					<th>Groups</th>
					<th>Role</th>
				</tr>
				{props.teamList.map((member) => {
						return (
							<tr>
								<td>{member.firstName}</td>
								<td>{member.lastName}</td>
								<td>{member.email}</td>
								<td>{member.groups}</td>
							</tr>
						)
					}
				)}
			</table>
		</div>
	)
}

export default TeamTable;