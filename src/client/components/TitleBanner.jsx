import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import styles from './TitleBanner.css';
import templateStyles from '../templates/MainTemplate.css';

class TitleBanner extends Component {
  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src={ this.props.src }
          backgroundSize="cover"
          backgroundPosition={ this.props.backgroundPosition || 'center' }
          backgroundAttachment="local" />
          <Center horizontal vertical>
            <div
              className={classnames(styles.titleText, templateStyles.header)}
              style={{ color: 'white' }}>
              { this.props.children }
            </div>
          </Center>
      </Jumbotron>
    );
  }
};

TitleBanner.propTypes = {
  src: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.string,
};

export default TitleBanner;
