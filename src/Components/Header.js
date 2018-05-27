import React, { Component } from 'react';


class Header extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var occupation = this.props.data.occupation;
      var description = this.props.data.description;
      var city = this.props.data.address.city;
      var networks = this.props.data.social.map(function (network) {
        var target = (network && network.target) || "";
        return <li key={network.name}><a href={network.url} target={target}><i className={network.className}></i></a></li>
      });
    }
    return (
      <header id="home">
        <div className="overlay"></div>
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
          <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
          <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">About</a></li>
            <li><a className="smoothscroll" href="#resume">Resume</a></li>
            <li><a className="smoothscroll" href="#portfolio">Portfolio</a></li>
            <li><a className="smoothscroll" href="#contact">Contact</a></li>
          </ul>

        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">{name}</h1>
            <h3>I'm an <span>{occupation}</span> based in {city}. <br /> {description}</h3>
            <hr />
            <ul className="social">
              {networks}
            </ul>
          </div>
        </div>
        <p className="scrolldown">
          <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
        </p>

      </header>
    );
  }
}

Header.defaultProps = {
  data: {
    name: "",
    occupation: "",
    description: "",
    address: {
      city: ""
    },
    social: []
  }
};

Header.propTypes = {
  data: React.PropTypes.shape({
    name: React.PropTypes.string,
    occupation: React.PropTypes.string,
    description: React.PropTypes.string,
    social: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        url: React.PropTypes.string,
        className: React.PropTypes.string,
        target: React.PropTypes.string
      })
    )
  })
}

export default Header;
