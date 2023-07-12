import { useState } from "react";
import PropTypes from 'prop-types';


export default function ContactForm({ addContact })
{
  const [name, setName] = useState('');
   const [number, setNumber] = useState('');
   

  const handleChange = (event) => {
  const {name , value} = event.target
    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(value)
        break;
      
      default:
        return;
    }
  
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });

    setName('');
    setNumber('');
  };
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
    
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            value={name}
            onChange={handleChange}

          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter number"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={!name || !number}>
          Add contact
        </button>
      </form>
    );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
