import React from 'react'

class GroupSelect extends React.Component {
	constructor(props) {
		super(props);
		this.fetchGroups = this.fetchGroups.bind(this);
		this.handleFetchGroups = this.handleFetchGroups.bind(this);
		this.handleSelectGroup = this.handleSelectGroup.bind(this);
	}

	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.handleFetchGroups(json)) 
	}

	componentDidMount() {
		this.fetchGroups();
	}

	handleFetchGroups(groupsList){
		this.props.initializeGroupList(groupsList);
	}

	handleSelectGroup(e){
		let selectedGroup;

		if (e.target.value === 'all') {
			selectedGroup = null;
		} else {
			selectedGroup = this.props.groupList.filter(item => e.target.value === item.name);
		}

		this.props.updateSelectedGroup(selectedGroup);
	}

	render() {		

		return (
			<div className='group-select'>
				<h4>Groups</h4>
				<select onChange={this.handleSelectGroup}>
					<option value="all">All</option>
					{this.props.groupList.map(group => <option key={group._id} value={group.name}>{group.name}</option>)}
				</select>
			</div>
		)
	}
}

export default GroupSelect;