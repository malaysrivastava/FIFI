import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Regauth from '../Assests/Authentication Illustration.svg';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    textChange: 'Register'
  });

  const { name, email, password1, password2, phone, street,pincode,state,city } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1 && phone) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1,
            phone,
            street,
            city,
            state,
            pincode
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              street: '',
              phone: '',
              state: '',
              pincode: '',
              city: '',
              textChange: 'Submitted'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              textChange: 'Sign Up'
            });
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };



  return (
    <div>
      <div >
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className="container p-2 mt-5">
        <div className="row m-auto">
        <div className="col-sm-5 p-3">
         <img src={Regauth} alt="register img" style={{width:'100%'}}/>
        </div>
        <div className="col-sm-4 offset-sm-3 p-3">
        <h1 className='text-2xl text-center font-extrabold'> Sign Up</h1>
        <form className="form mt-3 text-center" onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="name" onChange={handleChange('name')} value={name} />
          </div>
          <div className="form-group">
            <input className="form-control" type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" placeholder="confirm Password" onChange={handleChange('password2')} value={password2} />
          </div>
          <div className="form-group">
            <input className="form-control" type="number" placeholder="Phone Number" onChange={handleChange('phone')} value={phone} />
          </div>
          <div className="form-group">
            <input className="form-control" type="string" placeholder="Addres" onChange={handleChange('street')} value={street} />
          </div>
          <div className="form-group">
            <input className="form-control" type="string" placeholder="City" onChange={handleChange('city')} value={city} />
          </div>
          <div className="form-group">
            <input className="form-control" type="string" placeholder="State" onChange={handleChange('state')} value={state} />
          </div>
          <div className="form-group">
            <input className="form-control" type="number" placeholder="Pin Code" onChange={handleChange('pincode')} value={pincode} />
          </div>
          <Button variant="success" style={{width:'100%'}} type="submit">
            {formData.textChange}
          </Button>
        </form>
        <div className="col-sm-12 mt-2" >
        <h6 className="text-center m-0">Already a member?
        <a href='/login' target='_self'>
            <span className='ml-2'>SIGN IN</span>
          </a></h6>
     
        </div>
       
        </div>
        </div>
        </div>
               
      </div>
    </div>
  );
};

export default Register;