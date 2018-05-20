import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Landing from './components/layout/Landing';

import Register from './components/auth/register';
import Login from './components/auth/login';

import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
