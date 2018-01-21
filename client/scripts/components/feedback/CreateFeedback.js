import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';

import AnonymousAcctCreate from './AnonymousAcctCreate'

class CreateFeedback extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			organization: this.props.match.params.organization,
			shortId: this.props.match.params.shortId,
			// author: '',
			createdAt: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value, 
		});
	}

	handleSubmit(e) {
		e.preventDefault();
			const feedbackItem = Object.assign({}, this.state);
			feedbackItem.createdAt = Date.now(); 
			
			fetch(`/api/feedback/create/${this.state.shortId}`, {
				method: 'POST',
				body: JSON.stringify(feedbackItem),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				return res.json()
			}).then(json => {		
				this.props.history.push(`/getfeedback/${json._id}?showAlert=true`);
			})
	}

	componentDidMount() {
		if(this.props.loginAlert) {
			Alert.success('Account successfully created and logged in!', {
            position: 'top-right',
            effect: 'scale',
            timeout: 3000
        })
		}
	}

	// <p>Create an <Link to={`/getfeedback/`}><a className="create-acct" href="">anonymous account</a></Link> to get management's responses to your feedback!</p>

	render() {

		return(
			<div className="main-container col-sm-6">
				{this.props.loginAlert && <Alert />}
				<h4>Leave Some Feedback</h4>
				<form className="form-group" onSubmit={this.handleSubmit}>
					<textarea className="form-control fb-txt-area" type="text" onChange={this.handleChange} name="content" value={this.state.content} ></textarea>
					<button className="btn btn-primary" type="submit">submit</button>
				</form>
				{this.props.user ? null : <AnonymousAcctCreate refresh={this.props.refresh} signUpSuccess={this.props.signUpSuccess} />}
			</div>
			
		)
	}
}

export default CreateFeedback;