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
        const navLinkStyles = { textDecoration: 'none', color: '#f06c64' };
        return (
            <header>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#f06c64' }} ><h1>{title}</h1></Link>
                <div className={'Auth'}>
                    {!loggedIn ? 
                    <Fragment>
                        <NavLink to={'/login'} activeClassName={'active'} style={navLinkStyles}>
                            <span>Login</span>
                        </NavLink>
                        <NavLink to={'/signup'} activeClassName={'active'} style={navLinkStyles}>
                            <span>Signup</span>
                        </NavLink>
                    </Fragment> : 
                    <div className={'Logged'}>
                        <NavLink to={'/'} exact activeClassName={'active'} style={navLinkStyles}>
                            <span>Home</span>
                        </NavLink>
                        <NavLink to={'/streams'} exact activeClassName={'active'} style={navLinkStyles}>
                            <span>Streams Grid</span>
                        </NavLink>
                        <div>
                            <h5>You're signed as <span className="Email">{email}</span>.</h5>
                            <button onClick={handleLogOut} className={'LogOut'}>Log Out</button>
                        </div>
                    </div>}
                </div>
            </header>
        )
    }
}

export default Header;