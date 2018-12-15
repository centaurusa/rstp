import React from 'react';
import { NavLink } from 'react-router-dom';

const Auth = () => (
    <div className={'auth'}>
        <NavLink to={'/login'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Login</span></NavLink>
        <NavLink to={'/signup'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Signup</span></NavLink>
    </div>
)

export default Auth;
