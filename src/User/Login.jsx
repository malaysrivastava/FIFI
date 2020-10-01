import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import Regauth from '../Assests/Authentication Illustration.svg';

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
      <div className="container centered text-center p-2 m-1">
        <div className="row text-center m-auto">
        <div className="col-sm-5 p-3">
        <img src={Regauth} style={{width:'100%'}}/>
       </div>
       <div className="col-sm-4 offset-sm-3 p-3">

      <h1 className='text-2xl text-center mb-2 font-extrabold'> Sign In</h1>
      <form className="form" onSubmit={handleSubmit}>

        <div className="form-group">
          <input className="form-control" type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
        </div>
        <Button variant="success" style={{width:'100%'}} type="submit">
          Sign In
        </Button>
        <div className="form-group mt-2">
        <Link to='/users/password/forget'>Forget password?</Link>
        </div>
      </form>
      <div className="col-sm-12" style={{'margin-top':'4rem'}}>
      <Form.Text className="text-muted">
      <h6>Don't have an account ?
  <a href='/register' target='_self'>
          <span className='ml-2'>SIGN UP</span>
        </a></h6>
    </Form.Text>
      </div>
     
      </div>
      
      </div>
     </div>
    </div>
  );
};

export default Login;
