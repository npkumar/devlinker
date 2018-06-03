import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setUser } from './actions/authActions';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

// Check for token. If found, set headers and user
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />

            { /* Except landing all others in a container */}
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
