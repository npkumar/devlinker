import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
const PrivateRoute = (
  { component: Component, auth, ...rest }
) => {
  return (
    <Route
      { ...rest }
      render = { props =>
        auth.isAuthenticated === true ?
        ( <Component { ...props } /> ) :
        ( <Redirect to="/login" />)
      }
      >
    </Route>
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);