import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'SignIn'
  });
  const { email, password1 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'signin Successfully done'
            });
            console.log(isAuth());
            isAuth.role === 1 ? history.push('/admin/dashboard'): history.push('user/dashboard')
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <div>
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <h1 className='text-2xl font-extrabold'> Sign In for Instagram</h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
        </Form.Group>
        <Button variant="danger" type="submit">
          Sign In
        </Button>
        <Form.Group>
          <Form.Text className="text-muted">
            <h6>Don't have an account ?
        <a href='/register' target='_self'>
                <span className='ml-2'>Sign Up</span>
              </a></h6>
          </Form.Text>
        </Form.Group>
        <Form.Group>
        <Link to='/users/password/forget'>Forget password?</Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
