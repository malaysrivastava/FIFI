import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import Regauth from '../Assests/Authentication Illustration.svg';


const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: ''
  });


  const { email } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
        console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  
  return (
    <div >
      <ToastContainer />
      <div className="container m-1 centered p-2">
      <div className="row m-auto ">
      <div className="col-sm-5 p-3">
      <img src={Regauth} style={{width:'100%'}}/>
     </div>
     <div className="col-sm-4 offset-sm-3 pt-5">
     <h1 className='text-2xl m-3 text-center font-extrabold'> Forget Password </h1>
      <form className="form" onSubmit={handleSubmit}>

      <div className="form-group">
        <input className="form-control" type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
        </div>
      <Button variant="success" type="submit" style={{width:'100%'}}> Submit </Button>
      </form>
      </div>
      </div>
      </div>      
      
            </div>
  );
};

export default ForgetPassword;