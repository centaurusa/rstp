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
    message: PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string
    }),
    handleAuthSubmit: PropTypes.func
  }

  onSubmit(value, { setSubmitting, resetForm }) {
    this.props.handleAuthSubmit(value, this.props.type);
    setSubmitting(false);
    resetForm();
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
    const { message } = this.props;

    return (
      <div className={'AuthModal'}>
        <h4>{title}</h4>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={this.validateForm}
          onSubmit={this.onSubmit}
        >
        {({ isSubmitting, resetForm }) => (
            <Form>
              <Field type="email" name="email" placeholder="Email"/>
              <ErrorMessage className={'ErrMessage'} name="email" component="div" />
              <Field type="password" name="password" placeholder="Password"/>
              <ErrorMessage className={'ErrMessage'} name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>{title}</button>
            </Form>
        )}
        </Formik>
        <div className={`CustomMessage ${message.type}`}>{ message.text }</div>
      </div>
    )
  }
}

export default Auth;
