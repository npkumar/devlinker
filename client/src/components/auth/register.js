import React, { Component } from 'react'

class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    console.log(newUser);
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-warning">Sign Up</h1>
              <p className="lead text-center">Create your SocialCoder Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.name}
                    onChange={this.onChange}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name" name="name"
                    required />
                </div>
                <div className="form-group">
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    required />
                  <small className="form-text text-muted">Use a Gravatar email if you wish to have a profile photo.</small>
                </div>
                <div className="form-group">
                  <input
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password" />
                </div>
                <div className="form-group">
                  <input
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword" />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;