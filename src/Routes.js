import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Activate from './User/Activate';
import Login from './User/Login';
import Register from './User/Register';
import ForgetPassword from './User/ForgetPassword';
import ResetPassword from './User/ResetPassword';
import Profile from './User/Profile';
import Dashboard from './User/UserDashboard';
import AdminDashboard from './User/AdminDashboard';

import Home from './core/Home'
import PrivateRoute from './helpers/PrivateRoute';
import AdminRoute from './helpers/AdminRoute';
import Menu from './core/Menu'
import AddCategory from './Admin/AddCategory';
import AddSubCategory from './Admin/AddSubcategory';
import ErrorPage from './core/Error';
import Products from './core/Products';
import Category from './core/Category'

const Routes = () => {

    return (
        <div>
            <BrowserRouter>
            <Menu />
                <Switch>
                    <Route path='/register' exact render={props => <Register {...props} />} />
                    <Route path='/login' exact render={props => <Login {...props} />} />
                    <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
                    <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
                    <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
                    <Route path='/' exact render={props => <Home {...props} />} />
                    <Route path='/product/:productId' exact component={Products} /> 
                    <Route path='/category/:categoryId' exact component={Category} /> 

                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/create/category' exact component={AddCategory} />    
                    <AdminRoute path='/create/sub/category' exact component={AddSubCategory} />            
                    <PrivateRoute path = '/profile/:userId' exact component={Profile} />   
                    <PrivateRoute path = '/user/dashboard' exact component={Dashboard} />    
                    
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes;
