import React, { Component } from 'react';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import styles from './Banner.css';

class Banner extends Component {
  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src={ this.props.src }
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="local"/>
        <div
          className={styles.title}
          style={{ color: 'white', top: this.props.topMargin + "%"}}
        >
          { this.props.children }
        </div>
      </Jumbotron>
    );
  }
};

export default Banner;
