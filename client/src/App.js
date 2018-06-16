import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

// Check for token. If found, set headers and user
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);

  // Check for expiry
  const now = Date.now() / 1000;
  if (decoded.exp < now) {
    // Expired, logout user and redirect
    store.dispatch(logoutUser());

    // Clear current user profile
    store.dispatch(clearCurrentProfile());

    window.location.href = '/login';
  } else {
    // All good, set user
    store.dispatch(setUser(decoded));
  }
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
              <Route exact path="/dashboard" component={ Dashboard } />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
