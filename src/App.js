import React, { Component } from 'react';
import Header from './Components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import AuthModal from './Components/AuthModal/AuthModal';
import axios from 'axios';
import './App.css';

class App extends Component {

  userId = localStorage.getItem('userId');


  constructor(props) {
    super(props);
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
  }

  state = {
    isLoading: false,
    results: [],
    user: '',
    streams: []
  };

  handleAuthSubmit(value, type) {
    debugger;
  }

  componentDidMount() {
    // if (this.userId) {
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
    const { isLoading } = this.state;

    return (
      <div className="App">
        { isLoading && <Loader />}
        <Header title={'RTSP streams'} />
        {/* <Switch>
          <Route path="/details/:id" render={(props) => <FullDetailsCard results={this.state.results} {...props} />} />
          <Route path="/" exact component={() => <Results results={this.state.results} />} />
        </Switch> */}
        <Route path={'/login'} render={() => <AuthModal handleAuthSubmit={this.handleAuthSubmit} type="login"/>} />
        <Route path={'/signup'} render={() => <AuthModal handleAuthSubmit={this.handleAuthSubmit} type="signup"/>} />
      </div>
    );
  }
}

export default App;
