import {
	ADD_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	DELETE_CONTACT,
	FILTER_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT
} from "../types";

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
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c)
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
				})
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
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
