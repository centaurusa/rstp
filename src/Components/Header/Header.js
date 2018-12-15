import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from './Auth/Auth';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends Component {

    static propTypes = {
        title: PropTypes.string,
        loggedIn: PropTypes.bool,
        email: PropTypes.string,
        handleLogOut: PropTypes.func
    };
    
    render() {
        const { title, loggedIn, email, handleLogOut } = this.props;

        return (
            <header>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#f06c64' }} ><h1>{title}</h1></Link>
                <div className={'Auth'}>
                    {!loggedIn ? 
                    <Fragment>
                        <NavLink to={'/login'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Login</span></NavLink>
                        <NavLink to={'/signup'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Signup</span></NavLink>
                    </Fragment> : 
                    <div>
                        <h5>You're signed as <span className="Email">{email}</span>.</h5>
                        <button onClick={handleLogOut} className={'LogOut'}>Log Out</button>
                    </div>}
                </div>
            </header>
        )
    }
}

export default Header;