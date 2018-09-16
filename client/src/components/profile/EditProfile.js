import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      github: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(', ');

      profile.company = !_.isEmpty(profile.company) ? profile.company : '';
      profile.profile = !_.isEmpty(profile.profile) ? profile.profile : '';
      profile.bio = !_.isEmpty(profile.bio) ? profile.bio : '';
      profile.website = !_.isEmpty(profile.website) ? profile.website : ''
      profile.location = !_.isEmpty(profile.location) ? profile.location : '';
      profile.githubUsername = !_.isEmpty(profile.githubUsername) ? profile.githubUsername : '';

      profile.social = !_.isEmpty(profile.social) ? profile.social: {};
      profile.twitter = !_.isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.linkedin = !_.isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.facebook = !_.isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.github = !_.isEmpty(profile.social.github) ? profile.social.github : '';

      // Set state if profile exits
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubUsername: profile.githubUsername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        github: profile.github
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      github: this.state.github
    }

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const selectOptions = [{
      label: '* Select Professional Status',
      value: 0
    }, {
      label: 'Developer',
      value: 'Developer'
    }, {
      label: 'FrontEnd Developer',
      value: 'FrontEnd Developer'
    }, {
      label: 'BackEnd Developer',
      value: 'BackEnd Developer'
    }, {
      label: 'Full Stack Developer',
      value: 'Full Stack Developer'
    }, {
      label: 'Medior Developer',
      value: 'Medior Developer'
    }, {
      label: 'Senior Developer',
      value: 'Senior Developer'
    }, {
      label: 'Junior Developer',
      value: 'Junior Developer'
    }, {
      label: 'Student',
      value: 'Student'
    }, {
      label: 'Intern',
      value: 'Intern'
    }];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            name="github"
            placeholder="Github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            errors={errors.github}
            />

          <InputGroup
            name="linkedin"
            placeholder="LinkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
            />

          <InputGroup
            name="twitter"
            placeholder="Twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
            />

          <InputGroup
            name="facebook"
            placeholder="Facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
            />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique name for your profile URL"
                  />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={selectOptions}
                  info="Your current career status"
                  />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUsername"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="Your Github Protfolio"
                  />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Personal Website"
                  />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Company you are currently at"
                  />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Current residence city eg. Singapore"
                  />

                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please comma seperate values, eg. Java, Python."
                  />

                <TextAreaFieldGroup
                  placeholder="Summary"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Summary of your experience"
                  />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    className="btn btn-info">
                    Social Network Links
                  </button>
                  <span className="text-muted"> *Optional</span>
                </div>
                { socialInputs }
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-warning btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  errors: state.errorReducer
});

export default connect(mapStateToProps, {
  createProfile, getCurrentProfile
})(withRouter(EditProfile));
