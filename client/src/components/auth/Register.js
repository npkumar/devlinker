import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup  from '../common/TextFieldGroup';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    // from redux state to component state
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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

    this.props.registerUser(newUser, this.props.history);
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
                <TextFieldGroup
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  placeholder="Name"
                  name="name"
                  />

                <TextFieldGroup
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  info="Use a Gravatar email if you wish to have a profile photo."
                  />

                <TextFieldGroup
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  name="password"
                  />

                <TextFieldGroup
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  type="password"
                  error={errors.confirmPassword}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  errors: state.errorReducer
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));