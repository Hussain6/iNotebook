import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email.toString(),
        password: credentials.password.toString(),
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert('Logged in Successfully', 'success');
      navigate('/');
    } else {
      props.showAlert('Invalid Credentials', 'danger');
    }
  };

  return (
    <div className='container my-3'>
      <h2>Login to countinue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
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
            id='exampleInputPassword1'
            placeholder='Password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
