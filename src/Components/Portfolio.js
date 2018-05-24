import React, { Component } from 'react';


class Portfolio extends Component {
  render() {
    if (this.props.data) {
      var portfolio = this.props.data.projects.map(function (project) {
        var imageUrl = project && project.image && process.env.PUBLIC_URL + '/images/portfolio/' + project.image;
        var imgElement = imageUrl && (<a target="_blank" href={imageUrl}><img src={imageUrl} /></a>) || '';
        return (
          <div className="row work">
            <div className="three columns header-col">
              <h1><span>{project.title}</span></h1>
            </div>

            <div className="nine columns main-col">
              {project.description.split('\n').map(line => <p>{line}</p>)}
              {imgElement}
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

export default Portfolio;
