import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { saveStorage, loadStorage } from './Utils/LocalStorage';

import { Section } from './Section/Section';
import  ContactForm  from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return loadStorage(STORAGE_KEY) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveStorage(STORAGE_KEY, contacts);
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    contacts.some(({ name }) => name.toLowerCase() === data.name.toLowerCase())
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = userId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== userId)
    );
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const getFilterContacts = () => {
    const FilterlowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(FilterlowerCase)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />

        <ContactList
          contacts={getFilterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

