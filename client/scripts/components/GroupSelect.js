import React from 'react'

class GroupSelect extends React.Component {
	constructor(props) {
		super(props);
		this.fetchGroups = this.fetchGroups.bind(this);
		this.handleFetchGroups = this.handleFetchGroups.bind(this);
		this.handleSelectGroup = this.handleSelectGroup.bind(this);
	}

	//still need to hanlde initialization to 'all'
	
	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.handleFetchGroups(json)) 
	}

	componentDidMount() {
		this.fetchGroups();
	}

	handleFetchGroups(groupsList){
		this.props.onFetchGroups(groupsList);
	}

	handleSelectGroup(e){
		let selectedGroup = [];

		if (e.target.value === 'all') {
			selectedGroup = this.props.groupList 
		} else {
			selectedGroup = this.props.groupList.filter(item => e.target.value === item.groupName);
		}

		this.props.onSelectGroup(selectedGroup);
	}

	//Note - might want to set select menu selected value from state
	render() {		

		return (
			<div>
				<h1>Groups</h1>
				<select onChange={this.handleSelectGroup}>
					<option value="all">All</option>
					{this.props.groupList.map(group => <option key={group._id} value={group.groupName}>{group.groupName}</option>)}
				</select>
			</div>
		)
	}
}

export default GroupSelect;