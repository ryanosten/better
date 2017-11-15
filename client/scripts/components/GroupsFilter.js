import React from 'react'

const GroupsFilter = (props) => {
	return (
		<div>
			<h1>Groups</h1>
			<select>
				<option value="all">All</option>
				{props.groups.map(group => <option key={group._id} value={group.groupName}>{group.groupName}</option>)}
			</select>
		</div>
	)
}

export default GroupsFilter;