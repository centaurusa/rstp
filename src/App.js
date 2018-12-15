import React, { Component } from 'react';
import Header from './Components/Header/Header';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import AuthModal from './Components/AuthModal/AuthModal';
import HomePage from './Components/HomePage/HomePage';
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
      message: '',
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
      console.log('res', response.data);

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
            email: response.data.email
          }
        });
        this.props.history.push("/");
      } else {

      }
    } catch (err) {
      console.log('err', err.response);
      this.setState({ message: err.response.data.message })
    }
  }

  handleLogOut() {
    localStorage.removeItem('user');
    this.setState({
      user: {
        loggedIn: false,
        email: '',
        streams: []
      }
    })
  }

  componentDidMount() {
    // if (this.token) {
    //   axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { headers: { userId: this.userId }})
    //   .then(res => {
    //     this.setState({
    //       queries: res.data.user.queries
    //     });
    //     localStorage.setItem('userId', res.data.user._id);
    //   });
    // }
  }

  render() {
    const { isLoading, message } = this.state;
    const { loggedIn, email } = this.state.user;

    return (
      <div className="App">
        { isLoading && <Loader />}
        <Header title={'RTSP streams'} 
                loggedIn={loggedIn} 
                email={email} 
                handleLogOut={this.handleLogOut}/>
        {/* <Switch>
          <Route path="/details/:id" render={(props) => <FullDetailsCard results={this.state.results} {...props} />} />
          <Route path="/" exact component={() => <Results results={this.state.results} />} />
        </Switch> */}
        <Switch>
          <Route path={'/'} exact render={() => loggedIn ? <HomePage /> : <Redirect to='/login' />} />
          <Route path={'/login'} exact render={() => !loggedIn ? 
            <AuthModal handleAuthSubmit={this.handleAuthSubmit} message={message} type={'login'} /> : 
            <Redirect to={'/'} />} />
          <Route path={'/signup'} exact render={() => !loggedIn ? 
            <AuthModal handleAuthSubmit={this.handleAuthSubmit} message={message} type={'signup'} /> : 
            <Redirect to={'/'} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
