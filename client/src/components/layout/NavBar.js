import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Navbar = ({title, icon}) => {
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon}/>{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
					<Link to='/about'>About</Link>
					<Link to='/register'>Register</Link>
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		</div>
	);
};

Navbar.defaultProps = {
	title: 'Contact Keeper', PropTypes,
	icon: 'fas fa-id-card-alt',
}
Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

export default Navbar;
