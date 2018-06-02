import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const returnUser = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post('/api/users/login', returnUser)
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
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-warning">Log In</h1>
              <p className="lead text-center">Sign in to your SocialCoder account</p>
              <form onSubmit={this.onSubmit}>
                <div noValidate className="form-group">
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;