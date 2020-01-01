import React, {useContext, useEffect, useState} from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {

	const contactContext = useContext(ContactContext);
	const {addContact, current, updateContact, clearCurrent} = contactContext;
	const dummyContact = {
		name: '',
		email: '',
		type: 'personal',
		phone: '',
	}
	const [contact, setContact] = useState(dummyContact)

	useEffect(() => {
		if (current) {
			setContact(current)
		} else {
			setContact(dummyContact)
		}
	}, [contactContext, current])

	const {name, email, type, phone} = contact;
	const onChange = e => {
		setContact({...contact, [e.target.name]: e.target.value})
	}

	const onSubmit = e => {
		e.preventDefault();

		if (!current) {
			addContact(contact)
		} else {
			updateContact(contact)
		}
		clearAll();
	}

	const clearAll = () => {
		clearCurrent()
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input type="text" placeholder='Name' name='name' value={name} onChange={onChange}/>
			<input type="email" placeholder='Email' name='email' value={email} onChange={onChange}/>
			<input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
			<h5>Contact Type</h5>
			<input type="radio" name="type" value="personal" onChange={onChange}
				   checked={type === 'personal'}/> Personal {' '}
			<input type="radio" name="type" value="professional" onChange={onChange}
				   checked={type === 'professional'}/> Personal {' '}
			<div>
				<input type="submit" value={current ? 'Update Contact' : 'Add Contact'}
					   className="btn btn-primary btn-block"/>
			</div>
			{current && <div>
				<button onClick={clearAll} className="btn btn-light btn-block">Clear ALL</button>
			</div>}
		</form>
	);
};

export default ContactForm;
