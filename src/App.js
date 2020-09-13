import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sexy from './Navbar';
import Activate from './User/Activate';
import Login from './User/Login';
import Register from './User/Register';
import ForgetPassword from './User/ForgetPassword';
import ResetPassword from './User/ResetPassword';

const App = () => {

 return(
   <div>
  <BrowserRouter>
    <Sexy />
    <Switch>
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
    </Switch>
  </BrowserRouter>
  </div>
);
}

export default App;
