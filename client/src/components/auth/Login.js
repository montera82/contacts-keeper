import React, {useContext, useEffect, useState} from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;
	const {setAlert} = alertContext;
	const {login, error, clearErrors, isAuthenticated} = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'Invalid login') {
			setAlert(error, 'danger');
			clearErrors();
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const onChange = (e) => {
		setUser({...user, [e.target.name]: e.target.value})
	}

	const onSubmit = e => {
		e.preventDefault()
		login(user);
	}

	return (
		<div className='form-container'>
			<h1>
				Login <span className="text-primary">User</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input type="email" name="email" value={email} onChange={onChange} required/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" minLength={6} value={password} onChange={onChange} required/>
				</div>
				<input type="submit" value="Login" className="btn btn-primary btn-block"/>

			</form>
		</div>
	);
};

export default Login;
