import React from 'react';

const GroupList = (props) => {
	return(
		<ul>
			{props.groups.map(group => <li key={group._id}>{group.groupName}</li>)}
		</ul>
	)
}

export default GroupList;