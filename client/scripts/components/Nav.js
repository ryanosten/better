import React from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav className="nav-bar">
			<ul>
				<Link to={'/groups'}>
					<li>Manage Groups</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav;