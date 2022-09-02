import React from 'react';
import { useContext, useState } from 'react';
import noteContext from '../content/notes/noteContext';
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (note.title !== '' && note.description !== '' && note.tag !== '') {
      addNote(note.title, note.description, note.tag);
      setNote({
        title: '',
        description: '',
        tag: '',
      });
      props.showAlert('Added Successfully', 'success');
    } else {
      props.showAlert('Some Fields are Empty', 'danger');
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  return (
    <div>
      {' '}
      <div className='container my-3'>
        <h1>Add a Note</h1>

        <form className='mb-3'>
          <div>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              aria-describedby='emailHelp'
              onChange={onChange}
              minLength={5}
              value={note.title}
              required
            />
          </div>
          <div>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              aria-describedby='emailHelp'
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div>
            <label htmlFor='tag' className='form-label'>
              Tag
            </label>
            <input
              type='text'
              className='form-control'
              id='tag'
              name='tag'
              value={note.tag}
              aria-describedby='emailHelp'
              onChange={onChange}
            />
          </div>
          <button
            type='submit'
            onClick={handleClick}
            className='btn btn-primary my-2'
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
