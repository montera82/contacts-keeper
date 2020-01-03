import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({title, icon}) => {

	const authContext = useContext(AuthContext);
	const {logout, isAuthenticated, user} = authContext;

	const contactContext = useContext(ContactContext);
	const {clearContacts} = contactContext;

	const onLogout = () => {
		logout()
		clearContacts();
	}

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name},</li>
			<li>
				<a href="#!" onClick={onLogout}>
					<i className="fas fa-sign-out-alt"/> <span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>

			<Link to='/register'>Register</Link>
			<Link to='/login'>Login</Link>
		</Fragment>
	)
	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon}/>{title}
			</h1>
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
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
