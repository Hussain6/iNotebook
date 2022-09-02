import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../content/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes(); // eslint-disable-next-line
    } else {
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Updated Successfully', 'success');
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
      >
        Edit Note
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Note
              </h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className='mb-3'>
                <div>
                  <label htmlFor='etitle' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    aria-describedby='emailHelp'
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='edesc' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    minLength={5}
                    required
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    aria-describedby='emailHelp'
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div>
                  <label htmlFor='etag' className='form-label'>
                    Tag
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etag'
                    name='etag'
                    aria-describedby='emailHelp'
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                ref={refClose}
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='row my-3'>
          <h1>Your Notes</h1>
          <div className='container mx-2'>
            {notes.length === 0 && 'No Notes to Display'}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem
                note={note}
                updateNote={updateNote}
                key={note._id}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
