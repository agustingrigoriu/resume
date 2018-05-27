import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Portfolio extends Component {
  render() {
    if (this.props.data) {
      var portfolio = this.props.data.projects.map(function (project, index) {
        var imgElement = (project.image &&
          (
            <a target="_blank" href={process.env.PUBLIC_URL + '/images/portfolio/' + project.image}>
              <img src={process.env.PUBLIC_URL + '/images/portfolio/' + project.image} role="presentation" />
            </a>
          )) || "";

        var files = project.files && project.files.map(function (file, i) {
          var downloadItem = file.url && <a target="_blank" href={process.env.PUBLIC_URL + '/documents/' + file.url}>{file.name}</a>;
          return <p key={i} className="info">
            <span>&bull;</span>
            {downloadItem}
          </p>;
        });

        return (
          <div key={index} className="row work">
            <div className="three columns header-col">
              <h1><span>{project.title}</span></h1>
            </div>

            <div className="nine columns main-col">
              {project.description.split('\n').map((line, index) => <p key={index}>{line}</p>)}
              {imgElement}
              {files}
            </div>
          </div>
        );

      });
    }
    return (
      <section id="portfolio">
        <h1 className="title">Check Out Some of My Works.</h1>
        {portfolio}
      </section>
    );
  }
}


Portfolio.defaultProps = {
  data: {
    projects: []
  }
};

Portfolio.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        className: PropTypes.string,
        target: PropTypes.string
      })
    )
  })
}

export default Portfolio;
