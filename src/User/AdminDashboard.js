import React from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { name, email, role } = isAuth();
    return (
        <div>
        <Layout title='User Dashboard' description={`hello ${name}`}>
                <div>
                    <ul>
                        <li><Link to='/create/category'>Create category</Link></li>
                        <li><Link to='/create/sub/category'>Create subCategory</Link></li>
                    </ul>
                </div>

                <div>
                    <h3>User Info</h3>
                    <ul>
                        <li>{name}</li>
                        <li>{email}</li>
                        <li>{role === 1 ? 'admin' : 'client'}</li>
                    </ul>
                </div>
            </Layout>
        </div>
    );
}

export default AdminDashboard;
