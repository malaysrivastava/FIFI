import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: ''
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }


  }, [match.params]);


  const { name, token } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        toast.success(res.data.message);
      })
      .catch(err => {

        toast.error(err.response.data.errors);
      });
  };

  return (
    <div>
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <h1 className='text-2xl font-extrabold'>
          Welcome {name}
        </h1>
        <Form onSubmit={handleSubmit} >
          <Button variant="danger" type="submit">
            <span className='ml-3'>Activate your Account</span>
          </Button>
          <Form.Group>
            <Form.Text className="text-muted">
              <h6>Signup again ? ?
                <a href='/register' target='_self'>
                  <span className='ml-2'>Sign Up</span>
                </a></h6>
            </Form.Text>
          </Form.Group>
        </Form>

      </div>
    </div>
  );
};

export default Activate;
