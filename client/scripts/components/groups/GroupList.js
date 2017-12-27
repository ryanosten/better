import React from 'react';

const GroupList = (props) => {
	return (
		<ul className="group-list">
			{props.groups.map(group => <li className="group-item" key={group._id}>{group.name}</li>)}
		</ul>
	)
}

export default GroupList;