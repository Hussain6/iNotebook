import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert('Account Created Successfully', 'success');
      navigate('/');
    } else {
      props.showAlert('Invalid Credentials', 'danger');
    }
  };

  return (
    <div className='container my-3'>
      <h2>Sign Up to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Username</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={credentials.name}
            onChange={onChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={credentials.email}
            onChange={onChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            id='password'
            placeholder='Password'
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='cpassword'>Confirm Password</label>
          <input
            type='password'
            name='cpassword'
            className='form-control'
            id='cpassword'
            placeholder='Password'
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
