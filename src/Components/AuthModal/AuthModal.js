import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import './AuthModal.css';

class Auth extends Component {

  constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    type: PropTypes.string,
    handleAuthSubmit: PropTypes.func
  }

  onSubmit(value, { setSubmitting }) {
    this.props.handleAuthSubmit(value, this.props.type);
    setSubmitting(false);
  }

  /**
   * 
   * @param {form values} values 
   * @returns object with errors
   */
  validateForm(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required'
    }
    return errors;
  }

  render() {
    const title = this.props.type === 'login' ? 'Log in' : 'Sign Up';

    return (
      <div className={'AuthModal'}>
        <h4>{title}</h4>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={this.validateForm}
          onSubmit={this.onSubmit}
          // onSubmit={(values, { setSubmitting }) => {
          //     setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //     }, 400);
          // }}
        >
        {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="Email"/>
              <ErrorMessage className={'ErrMessage'} name="email" component="div" />
              <Field type="password" name="password" placeholder="Password"/>
              <ErrorMessage className={'ErrMessage'} name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>{title}</button>
            </Form>
        )}
        </Formik>
      </div>
    )
  }
}

export default  Auth;
