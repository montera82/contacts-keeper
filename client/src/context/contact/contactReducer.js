import {ADD_CONTACT, CLEAR_CURRENT, DELETE_CONTACT, SET_CURRENT} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
			}

		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			}
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(c => c.id !== action.payload)
			}
		default:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],

			}
	}
}
