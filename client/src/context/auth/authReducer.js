import {
	AUTH_ERROR,
	CLEAR_ERRORS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS, USER_LOADED,
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false
			}
		case LOGOUT:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				error: action.payload,
				user: null,
			}
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state
	}
}
