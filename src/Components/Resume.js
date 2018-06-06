import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resume extends Component {
  render() {
    if (this.props.data) {

      // Education
      var education = this.props.data.education.map(function (edu) {

        var downloadIcon = (edu.file &&
          (
            <a target="_blank" href={process.env.PUBLIC_URL + '/documents/' + edu.file}>
              <i className="fa fa-download"></i>
            </a>
          )) || "";

        var historic_average = (edu.historic_average && (
          <span>
            &bull;
            <em className="date"> Historic Average: <b>{edu.historic_average}</b></em>
          </span>
        )) || "";

        return (
          <div key={edu.school} className="row item">
            <div className="twelve columns">
              <h3>{edu.school} &nbsp; {downloadIcon}</h3>
              <p className="info">
                {edu.degree}
                <span>&bull;</span>
                <em className="date">{edu.graduated}</em>
                {historic_average}
              </p>
              <p>
                {edu.description}
              </p>
            </div>
          </div>
        );
      });

      // Jobs/Work
      var work = this.props.data.work.map(function (job) {
        return <div key={job.company} className="row item">
          <div className="twelve columns">
            <h3>{job.company}</h3>
            <p className="info">{job.title}<span>&bull;</span> <em className="date">{job.years}</em></p>
            <p>
              {job.description}
            </p>
          </div>
        </div>
      });

      // Languages
      var languages = this.props.data.languages.map(function (language) {
        var levels = language && language.levels && language.levels.map(function (level, i) {

          var downloadIcon = (level.file &&
            (
              <a target="_blank" href={process.env.PUBLIC_URL + '/documents/' + level.file}>
                <i className="fa fa-download"></i>
              </a>
            )) || "";

          return <p key={i} className="info">
            <span>&bull;</span>
            {level.name} &nbsp; {downloadIcon}
          </p>;

        });

        return (
          <div key={language.language} className="row item">
            <div className="twelve columns">
              <h3>{language.language}</h3>
              {levels}
              <p>{/* Agrego un margin */}</p>
            </div>
          </div>);
      });

      // Skills
      var skills = this.props.data.skills.map(function (skill) {
        var className = 'bar-expand ' + skill.name.toLowerCase();
        return <li key={skill.name}><span data-title={skill.level} style={{ width: skill.level }} className={className}></span><em>{skill.name}</em></li>
      });
    }

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            {education}
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Languages</span></h1>
          </div>

          <div className="nine columns main-col">
            {languages}
          </div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>
          <div className="nine columns main-col">
            <p>The main skill sets below outline the variety of skills performed within my roles at my current jobs and experience given by my formation as an engineer.
            </p>
            <div className="bars">
              <ul className="skills">
                {skills}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


Resume.defaultProps = {
  data: {
    education: [],
    work: [],
    languages: [],
    skills: []
  }
};

Resume.propTypes = {
  data: PropTypes.shape({
    education: PropTypes.arrayOf(
      PropTypes.shape({
        school: PropTypes.string,
        degree: PropTypes.string,
        graduated: PropTypes.string,
        description: PropTypes.string,
        file: PropTypes.string,
        historic_average: PropTypes.string,
      })
    ),
    work: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string,
        title: PropTypes.string,
        years: PropTypes.string,
        description: PropTypes.string
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        levels: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            file: PropTypes.string
          })
        )
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string
      })
    )
  })
}

export default Resume;
