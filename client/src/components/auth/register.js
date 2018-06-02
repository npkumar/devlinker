import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

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

    axios.post('/api/users/register', newUser)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: err.response.data
        });
      })
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-warning">Sign Up</h1>
              <p className="lead text-center">Create your SocialCoder Account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    value={this.state.name}
                    onChange={this.onChange}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.name
                    })}
                    placeholder="Name" name="name"
                    />
                    { errors.name && (<div className="invalid-feedback">{ errors.name }</div>) }
                </div>
                <div className="form-group">
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    />
                    { errors.email && (<div className="invalid-feedback">{ errors.email }</div>) }
                  <small className="form-text text-muted">Use a Gravatar email if you wish to have a profile photo.</small>
                </div>
                <div className="form-group">
                  <input
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password" />
                    { errors.password && (<div className="invalid-feedback">{ errors.password }</div>) }
                </div>
                <div className="form-group">
                  <input
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword" />
                    { errors.confirmPassword && (<div className="invalid-feedback">{ errors.confirmPassword }</div>) }
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