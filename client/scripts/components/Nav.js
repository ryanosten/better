import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link to={'/'} className="navbar-brand">Better</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    		<span className="navbar-toggler-icon"></span>
  		</button>
			<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to={'/groups'} className="nav-link">Groups</Link>
					</li>
					<li className="nav-item">
						<Link to={'/groups'} className="nav-link">Users</Link>
					</li>
					<li className="nav-item">
						<Link to={'/generate-link'} className="nav-link">Generate Link</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Nav;