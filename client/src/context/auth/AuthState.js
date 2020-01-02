import React, {useReducer} from "react";
import authReducer from './authReducer';
import authContext from "./authContext";
import axios from "axios"
import {
	AUTH_ERROR,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_SUCCESS, LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED
} from "../types";
import setTokenGlobally from '../../utils/setTokenGlobal';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const registerUser = async (user) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/users', user, config)

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})

			loadUser()
		} catch (err) {
			console.log(err.response.data.msg)
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			})
		}
	}

	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS,
		})
	}

	const loadUser = async () => {

		// set global auth header
		setTokenGlobally(localStorage.getItem('token'))

		try {
			const res = await axios.get('/api/auth')

			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch (err) {
			console.log(err.response.data.msg)
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.msg
			})
		}
	}

	const login = async (user) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/auth', user, config)

			console.log({res});
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})

			loadUser()
		} catch (err) {
			console.log(err.response.data.msg)
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg
			})
		}
	}

	const logout = () => {
		dispatch({
			type: LOGOUT,
		})
	}

	return <authContext.Provider
		value={{
			token: state.token,
			error: state.error,
			isAuthenticated: state.isAuthenticated,
			user: state.user,
			loading: state.loading,
			registerUser,
			clearErrors,
			loadUser,
			login,
			logout,
		}}>
		{props.children}
	</authContext.Provider>

};

export default AuthState;
