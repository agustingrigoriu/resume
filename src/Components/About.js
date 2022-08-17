import React, { Component } from 'react';
import PropTypes from 'prop-types';

class About extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var image = process.env.PUBLIC_URL + '/images/' + this.props.data.image;
      var bio = this.props.data.bio;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = process.env.PUBLIC_URL + '/documents/' + this.props.data.resumedownload;
    }
    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src={image} alt="" />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>
            {bio.split('\n').map((line, index) => <p key={index}>{line}</p>)}
            {/* <p>{bio}
            </p> */}
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span><br />
                  <span>
                    {city}, {state}
                  </span><br />
                  <span>{phone}</span><br />
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href={resumeDownload} className="button" target="_blank"><i className="fa fa-download"></i>Download Resume</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


About.defaultProps = {
  data: {
    name: "",
    image: "",
    bio: "",
    adress: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    phone: "",
    email: "",
    resumedownload: ""
  }
};

About.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    adress: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string
    }),
    phone: PropTypes.string,
    email: PropTypes.string,
    resumedownload: PropTypes.string
  })
}

export default About;
