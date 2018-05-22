import React, { Component } from 'react';


class Resume extends Component {
  render() {
    if (this.props.data) {
      var education = this.props.data.education.map(function (edu) {
        var url = (edu && edu.file && process.env.PUBLIC_URL + '/documents/' + edu.file) || '#';
        var downloadIcon = <a target="_blank" href={url}><i className="fa fa-download"></i></a>;
        var historic_average = edu.historic_average && (
          <span>
            &bull;
            <em className="date"> Historic Average: <b>{edu.historic_average}</b></em>
          </span>) || '';
        return <div key={edu.school} className="row item">
          <div className="twelve columns">
            <h3>{edu.school} &nbsp; {edu && edu.file && downloadIcon}</h3> 
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
      });

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

      var languages = this.props.data.languages.map(function (language) {
        var levels = language && language.levels && language.levels.map(function (level) {
          var url = (level && level.file && process.env.PUBLIC_URL + '/documents/' + level.file) || '#';
          var downloadIcon = <a target="_blank" href={url}><i className="fa fa-download"></i></a>;
          return <p className="info">
            <span>&bull;</span>
            {level.name} &nbsp; {level && level.file && downloadIcon}
          </p>;
        });
        return (
          <div key={language.language} className="row item">
            <div className="twelve columns">
              <h3>{language.language}</h3>
              {levels}
              {/* Agrego un margin */}
              <p></p>
            </div>
          </div>);
      });

      var skills = this.props.data.skills.map(function (skill) {
        var className = 'bar-expand ' + skill.name.toLowerCase();
        return <li key={skill.name}><span style={{ width: skill.level }} className={className}></span><em>{skill.name}</em></li>
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

export default Resume;
