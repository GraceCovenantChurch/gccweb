import React, { Component } from 'react';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import * as constFunc from './utilities/functions';

import styles from './BannerBibleVerse.css';

class BannerBibleVerse extends Component {
  render() {
    return (
      <Jumbotron
        className={ this.props.className }
        style={{ height: '100vh' }}>
        <BackgroundImage
          src={ constFunc.getVerseImage() }
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="fixed" />
        <Center horizontal vertical>
          <div
          className={styles.bibleVerse}
          style={{ color: 'black' }}>
              <h1>
                { constFunc.getMonth() }: Monthly Memory Verse
              </h1>
              <h3>
                { constFunc.getVerse() }
              </h3>
              <h4>
                { constFunc.getCitation() }
              </h4>
            </div>
          </Center>
      </Jumbotron>
    );
  }
};

export default BannerBibleVerse;
