import React, {useReducer} from "react";
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {ADD_CONTACT, CLEAR_CURRENT, DELETE_CONTACT, SET_CURRENT} from "../types";


const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jill Johnson',
				email: 'jill@gmail.com',
				phone: '111-1111-1111',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Sarah Watson',
				email: 'sara@gmail.com',
				phone: '222-1111-1111',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Sharon Ozunam',
				email: 'sharon@gmail.com',
				phone: '222-1111-1111',
				type: 'professional'
			}
		],
		current: null
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);


	// Add contact
	const addContact = (contact) => {

		contact.id = uuid.v4()
		dispatch({
			type: ADD_CONTACT,
			payload: contact
		})
	}

	// Delete contact
	const deleteContact = (id) => {
		dispatch({
			type: DELETE_CONTACT,
			payload: id,
		})
	}

	// Set current contact
	const setCurrent = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact
		})
	}

	// clear current contact
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT,
		})
	}

	// update contact

	// filter contacts

	// clear filter

	return <ContactContext.Provider
		value={{
			contacts: state.contacts,
			current: state.current,
			addContact,
			deleteContact,
			setCurrent,
			clearCurrent
		}}>
		{props.children}
	</ContactContext.Provider>

};

export default ContactState;
