import React from 'react';

class GenerateLink extends React.Component {
	
	constructor() {
		super();
		this.state={
			groupList: [],
			selectedGroup: null,
			link: ''
		}

		this.fetchGroups = this.fetchGroups.bind(this);
		this.handleSelectGroup = this.handleSelectGroup.bind(this);
		this.genLink = this.genLink.bind(this);
		this.clearLink = this.clearLink.bind(this);
	}

	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.setState({ groupList: json }))
			.then(() => this.setState({ selectedGroup: this.state.groupList[0] }))
	}

	handleSelectGroup(e) {
		const group = this.state.groupList.filter(item => e.target.value === item.groupName);
		const selectedGroup = group[0];
		this.setState({ selectedGroup });
	}

	genLink(){
		const link = `localhost:8080/feedback/create/${this.state.selectedGroup._id}`
		this.setState({ link });
		
		// return link
	}

	clearLink(){
		this.setState({ link: ''})
	}

	componentDidMount() {
		this.fetchGroups();
	}

	render() {
		//let link; wanted to not store link in state couldnt figure it out... tried to call genLink to return link and store in link this var

		return (
			<div>
				<a className="nav-link" data-toggle="modal" data-target="#exampleModal" onClick={this.clearLink}>Generate Link</a>
				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Select Group</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        <select onChange={this.handleSelectGroup}>
									{this.state.groupList.map(group => <option key={group._id} value={group.groupName}>{group.groupName}</option>)}
								</select>
								<span>{this.state.link}</span>
				      </div>
				      <div className="modal-footer gen-link">
				        <button type="button" className="btn btn-primary" onClick={this.genLink}>Get Link</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
}
	
		
	


export default GenerateLink;
