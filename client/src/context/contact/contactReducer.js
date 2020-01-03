import {
	ADD_CONTACT, CLEAR_CONTACTS,
	CLEAR_CURRENT,
	CLEAR_FILTER, CONTACT_ERROR,
	DELETE_CONTACT,
	FILTER_CONTACTS, GET_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false,
			}

		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			}
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(c => c._id === action.payload._id ? action.payload : c),
				loading: false,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			}
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				}),
				loading: false,
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			}
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(c => c._id !== action.payload),
				loading: false,
			}
		case CONTACT_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			}
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null,
			}
		default:
			return state
	}
}
