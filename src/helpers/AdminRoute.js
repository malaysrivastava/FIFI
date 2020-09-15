import React from 'react';
import { Route , Redirect} from 'react-router-dom';
import { isAuth } from './auth';


const AdminRoute  = ({component: Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render = {
            props => isAuth() && isAuth().role === 1  ? (<Component {...props} />): (
            <Redirect 
            to={{
                pathname: '/login',
                state: {from : props.location}
            }}
            />
            )
        }
      />
    );
}

export default AdminRoute;