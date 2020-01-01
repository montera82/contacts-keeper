import React, {useReducer} from "react";
import authReducer from './authReducer';
import authContext from "./authContext";

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);


	return <authContext.Provider
		value={{
			token: state.token,
			isAuthenticated: state.isAuthenticated,
			user: state.user,
			loading: state.loading,
		}}>
		{props.children}
	</authContext.Provider>

};

export default AuthState;
