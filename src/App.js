import React, { Component } from 'react';
import Header from './Components/Header/Header';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import AuthModal from './Components/AuthModal/AuthModal';
import HomePage from './Components/HomePage/HomePage';
import StreamsGrid from './Components/StreamsGrid/StreamsGrid';
import axios from 'axios';
import './App.css';

class App extends Component {

  user = localStorage.getItem('user');

  constructor(props) {
    super(props);
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);

    if (!this.user) {
      this.user = {
        loggedIn: false,
        email: '',
        streams: []
      }
    } else {
      this.user = JSON.parse(`${this.user}`);
      this.user.loggedIn = true;
    }

    this.state = {
      isLoading: false,
      message: {
        text: '',
        type: ''
      },
      user: this.user
    };
  }



  handleAuthSubmit = async (values, type) => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/${type}`, {
        email: values.email,
        password: values.password
      });

      // login
      if (type === 'login') {
        const user = JSON.stringify({
          'token': response.data.token,
          'userId': response.data.userId,
          'email': response.data.email
        });

        localStorage.setItem('user', user);
        this.setState({
          isLoading: false,
          user: {
            loggedIn: true,
            userId: response.data.userId,
            token: response.data.token,
            email: response.data.email
          }
        });

        // get users streams
        this.getStreams();

        this.props.history.push("/");
      } else {
        // Sign Up
        this.setState({
          message: {
            text: 'Done! You can now sign in.',
            type: 'success'
          }
        })
      }
    } catch (err) {
      console.log('err', err.response);
      this.setState({ 
        message: {
          text: err.response.data.message,
          typer: 'error'
      }})
    }
  }
  /**
   * @description
   * Handle Logging out
   */
  handleLogOut() {
    localStorage.removeItem('user');
    this.setState({
      message: '',
      user: {
        loggedIn: false,
        email: '',
        streams: []
      }
    })
  }

  /**
   * 
   * @param {e, value}
   */
  handleAddStream = async (e, value) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/streams`, {
        email: this.state.user.email,
        stream: value
      }, { headers: { Authorization: "Bearer " + this.state.user.token }});

      this.setState({
        user: {
          ...this.state.user,
          streams: response.data.streams
        }
      });
      // redirect to grid and display page
      this.props.history.push("/streams");

    } catch (err) {
      console.log(err);
    }
  }

   async getStreams() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/streams`, 
      { headers: { Authorization: "Bearer " + this.state.user.token, _id: this.state.user.userId }});
      
      if (response && response.data) {
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            streams: response.data.streams
          }
        });
      }
    } catch (err) {
      console.log(err);
      this.handleLogOut();
    }

  }

  async componentDidMount() {

    if (this.state.user.loggedIn) {
      this.getStreams();
    }
  }

  render() {
    const { isLoading, message } = this.state;
    const { loggedIn, email, streams } = this.state.user;

    return (
      <div className="App">
        { isLoading && <Loader />}
        <Header title={'RTSP streams'} 
                loggedIn={loggedIn} 
                email={email} 
                handleLogOut={this.handleLogOut}/>
        <Switch>
          <Route path={'/'} exact render={() => loggedIn ? <HomePage handleAddStream={this.handleAddStream} /> : <Redirect to='/login' />} />
          <Route path={'/login'} exact render={() => !loggedIn ? 
            <AuthModal handleAuthSubmit={this.handleAuthSubmit} message={message} type={'login'} /> : 
            <Redirect to={'/'} />} />
          <Route path={'/signup'} exact render={() => !loggedIn ? 
            <AuthModal handleAuthSubmit={this.handleAuthSubmit} message={message} type={'signup'} /> : 
            <Redirect to={'/'} />} />
          <Route path={'/streams'} exact render={() => loggedIn ? 
            <StreamsGrid streams={streams}/> : 
            <Redirect to={'/login'} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
