import React from 'react';
import { Link } from 'react-router-dom';

import GenerateLink from './GenerateLink';

const Nav = ( { user, logout } ) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link to={'/'} className="navbar-brand">Better</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		{user.role !== 'feedbacker' ?
  			<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to={'/groups'} className="nav-link">Groups</Link>
						</li>
						<li className="nav-item">
							<GenerateLink user={user} />
						</li>
						<li className="nav-item">
							<Link to={'/team'} className="nav-link">Team</Link>
						</li>
						<li className="nav-item">
								<a className="nav-link" onClick={logout}>Logout</a>
						</li>
					</ul>
				</div>
				: 

				<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
					<ul className="navbar-nav">
						<li className="nav-item">
								<a className="nav-link" onClick={logout}>Logout</a>
						</li>
					</ul>
				</div>
  		}
			
		</nav>
	)
}

export default Nav;