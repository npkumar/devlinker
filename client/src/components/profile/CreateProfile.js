import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
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
            name="linkedin"
            placeholder="LinkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.state.onChange}
            errors={errors.linkedin}
            />

          <InputGroup
            name="twitter"
            placeholder="Twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.state.onChange}
            errors={errors.twitter}
            />

          <InputGroup
            name="facebook"
            placeholder="Facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.state.onChange}
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
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">Let's get started!</p>
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
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    className="btn btn-light ">
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  errors: state.errorReducer
});

export default connect(mapStateToProps)(CreateProfile);
