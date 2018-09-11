import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileActions extends Component {
  render() {
    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light text-primary mr-1">
          <i className="fas fa-kiwi-bird"> Edit Profile</i>
        </Link>
        <Link to="/add-experience" className="btn btn-light text-primary mr-1">
          <i className="fas fa-dove"> Add Experience</i>
        </Link>
        <Link to="/add-education" className="btn btn-light text-primary mr-1">
          <i className="fas fa-feather"> Add Education</i>
        </Link>
        <Link to="/add-publication" className="btn btn-light text-primary mr-1">
          <i className="fas fa-frog"> Add Publication</i>
        </Link>
      </div>
    );
  }
}

export default ProfileActions;