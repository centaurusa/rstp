import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth/Auth';
import PropTypes from 'prop-types';

import './Header.css';

const Header = (props) => (
    <header>
        <Link to={'/'} style={{ textDecoration: 'none', color: '#f06c64' }} ><h1>{props.title}</h1></Link>
        <Auth loggedIn={props.loggedIn} email={props.email} />
    </header>
)

Header.propTypes = {
    title: PropTypes.string,
    loggedIn: PropTypes.bool,
    email: PropTypes.string
};

export default Header;