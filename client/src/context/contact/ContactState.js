import React, {useReducer} from "react";
import axios from 'axios'
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT, CLEAR_CONTACTS,
	CLEAR_CURRENT,
	CLEAR_FILTER, CONTACT_ERROR,
	DELETE_CONTACT,
	FILTER_CONTACTS, GET_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT
} from "../types";


const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get Contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');

			dispatch({
				type: GET_CONTACTS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};

	// Add contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);

			dispatch({
				type: ADD_CONTACT,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			})
		}
	}

	// Delete contact
	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);

			dispatch({
				type: DELETE_CONTACT,
				payload: id
			})
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			})
		}
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
	const updateContact = (contact) => {
		dispatch({
			type: UPDATE_CONTACT,
			payload: contact
		})
	}

	// filter contacts
	const filterContacts = (text) => {
		dispatch({
			type: FILTER_CONTACTS,
			payload: text
		})
	}

	// clear filter
	const clearFilter = (text) => {
		dispatch({
			type: CLEAR_FILTER,
			payload: text
		})
	}

	const clearContacts = () => {
		dispatch({
			type: CLEAR_CONTACTS,
		})
	}

	return <ContactContext.Provider
		value={{
			contacts: state.contacts,
			current: state.current,
			filtered: state.filtered,
			loading: state.loading,
			addContact,
			deleteContact,
			setCurrent,
			clearCurrent,
			updateContact,
			filterContacts,
			clearFilter,
			getContacts,
			clearContacts
		}}>
		{props.children}
	</ContactContext.Provider>

};

export default ContactState;
