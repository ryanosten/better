import React from 'react';

const GroupsList = (props) => {
	return(
		<ul>
			{props.groups.map(group => <li key={group._id}>{group.groupName}</li>)}
		</ul>
	)
}

export default GroupsList;