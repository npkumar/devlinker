const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 50,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },
  githubUsername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: String,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  publication: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  award: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  certification: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;
