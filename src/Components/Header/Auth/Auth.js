import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
class Auth extends Component {

  static propTypes ={
    loggedIn: PropTypes.bool,
    email: PropTypes.string
  }

  render() {
    const { loggedIn, email } = this.props;

    return (
        <div className={'Auth'}>
            {!loggedIn ? <Fragment>
                <NavLink to={'/login'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Login</span></NavLink>
                <NavLink to={'/signup'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Signup</span></NavLink>
            </Fragment> : <h5>You're signed in as <br /><span className="Email">{email}</span>.</h5>}
        </div>
    )
  }
}

export default Auth;
