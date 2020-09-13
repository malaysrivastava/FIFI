import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'

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
            <h1 className='text-2xl font-extrabold'> Forget Password </h1>
            <Form onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
            </Form.Group>
            <Button variant="danger" type="submit"> Submit </Button>
            </Form>
            </div>
  );
};

export default ForgetPassword;