import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
class Auth extends Component {

  constructor(props) {
      super(props);
      this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
      localStorage.removeItem('user');
      this.props.history.push('/login');
  }

  static propTypes = {
      loggedIn: PropTypes.bool,
      email: PropTypes.string
  }

  render() {
    const { loggedIn, email } = this.props;

    return (
        <div className={'Auth'}>
            {!loggedIn ? 
            <Fragment>
                <NavLink to={'/login'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Login</span></NavLink>
                <NavLink to={'/signup'} activeClassName={'active'} style={{ textDecoration: 'none', color: '#f06c64' }}><span>Signup</span></NavLink>
            </Fragment> : 
            <div>
                <h5>You're signed as <span className="Email">{email}</span>.</h5>
                <button onClick={this.handleLogOut} className={'LogOut'}>Log Out</button>
            </div>}
        </div>
    )
  }
}

export default withRouter(Auth);
