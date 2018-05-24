import React, { Component } from 'react';


class Portfolio extends Component {
  render() {
    if (this.props.data) {
      var portfolio = this.props.data.projects.map(function (project) {
        var imageUrl = process.env.PUBLIC_URL + '/images/portfolio/' + project.image;
        return (
          <div className="row work">
            <div className="three columns header-col">
              <h1><span>{project.title}</span></h1>
            </div>

            <div className="nine columns main-col">
              <p>{project.description}</p>
              <img src={imageUrl} />
            </div>
          </div>
        );

      });
    }
    return (
      <section id="portfolio">

        <h1>Check Out Some of My Works.</h1>
        {portfolio}

      </section>
    );
  }
}

export default Portfolio;
