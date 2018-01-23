import React from 'react';
import Modal from 'react-modal';

import CreateUser from '../CreateUser'

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

class AnonymousAcctCreate extends React.Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			user: '',
		}
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true })
	}

	closeModal() {
		this.setState({ modalIsOpen: false })
	}

	render() {
		
		return(
			<div>
				<p> Create an <a className="create-acct" onClick={this.openModal}>anonymous account</a> to see management's response to your feedback! Totally optional. </p>
				<Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
          <CreateUser role='feedbacker' login='Anonymous username' refresh={this.props.refresh} signUpSuccess={this.props.signUpSuccess} />
        </Modal> 
			</div>
		)
	}
}

export default AnonymousAcctCreate