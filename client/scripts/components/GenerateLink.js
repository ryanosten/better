import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    'max-width': '600px',
    'min-width': '250px'
  }
};


class GenerateLink extends React.Component {
	
	constructor() {
		super();
		this.state={
			organization: 'hackeryou',
			groupList: [],
			selectedGroup: null,
			link: '',
			modalIsOpen: false
		}

		this.fetchGroups = this.fetchGroups.bind(this);
		this.handleSelectGroup = this.handleSelectGroup.bind(this);
		this.genLink = this.genLink.bind(this);
		this.clearLink = this.clearLink.bind(this);
		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

	fetchGroups() {
		fetch('/api/groups')
			.then(res => res.json())
			.then(json => this.setState({ groupList: json }))
			.then(() => this.setState({ selectedGroup: this.state.groupList[0] }))
	}

	handleSelectGroup(e) {
		const group = this.state.groupList.filter(item => e.target.value === item.name);
		const selectedGroup = group[0];
		this.setState({ selectedGroup });
	}

	genLink(e){
		e.preventDefault();
		const link = `localhost:8080/feedback/${this.state.organization}/${this.state.selectedGroup.shortId}`
		this.setState({ link });
		
	}

	clearLink(){
		this.setState({ link: ''})
	}

	componentDidMount() {
		this.fetchGroups();
	}

	openModal() {
		this.clearLink();
		this.setState({ modalIsOpen: true })
	}

	closeModal() {
		this.setState({ modalIsOpen: false })
	}

	render() {
		//let link; wanted to not store link in state couldnt figure it out... tried to call genLink to return link and store in link this var

		return (
			<div>
        <a className="nav-link" onClick={this.openModal}>Get Link</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
 
          <h4 ref={subtitle => this.subtitle = subtitle}>Select Group</h4>
          <button type="button" className="close gen-link-close" onClick={this.closeModal}><span>&times;</span></button>
          <select className="gen-link-group" onChange={this.handleSelectGroup}>
						{this.state.groupList.map(group => <option key={group._id} value={group.name}>{group.name}</option>)}
					</select>
          <div className="link">{this.state.link}</div>
          <form className="gen-link-form">
            <button className="btn btn-primary gen-link-btn" onClick={this.genLink}>Get Link</button>
          </form>
        </Modal>
      </div>
		)
	}
}
	
		
	


export default GenerateLink;
