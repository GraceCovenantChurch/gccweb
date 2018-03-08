import React, {Component} from 'react';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import pluralize from 'pluralize';

import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';
import Jumbotron from '../components/Jumbotron';
import Event from '../components/Event';
import TitleBanner from '../components/TitleBanner';
import Banner from '../components/Banner';
import BannerBibleVerse from '../components/BannerBibleVerse';
import EventBox from '../components/EventBox';
import AspectRatio from '../components/AspectRatio';
import {fetchModelData} from '../modules/modelData';

import * as constVars from './vars/home-vars.js';
import styles from './Home.css';
import templateStyles from '../templates/MainTemplate.css';

class Home extends Component {

  componentDidMount(){
    this.props.fetchData();
  }

  render() {
    return (
      <div id="home">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>

        <Jumbotron style={{height: '100vh'}}>
          <BackgroundImage
            src="/static/images/home/beliefs.jpg"
            backgroundSize="cover"
            backgroundPosition="top left"
            backgroundAttachment="local"/>
          <div
            className={styles.title}
            style={{ color: 'white', top: '40%'}}>
              <h1 className={templateStyles.headerHome}>
                Grace Covenant Church
              </h1>
              <div className={styles.subtitle}>
                <h3>
                  Raising up Kingdom workers who are <br/>
                  influenced by Christ to change the world.
                </h3>
              </div>
          </div>
        </Jumbotron>

        <Banner src="/static/images/home/worship.jpg" topMargin={30}>
          <h1 className={templateStyles.headerHome}>
            Join Us In Worship
          </h1>
          <div className={styles.subtitle}>
            <h3>
              Sunday Service 11:15AM <br/>
              Friday Night Live 7:30PM
            </h3>
            <h4>
              Meyerson Hall B-1, 210 South 34th Street <br/>
              Philadelphia, PA 19104
            </h4>
            <a href="/welcome">
              <button className={styles.infoButton}>More Info</button>
            </a>
          </div>
        </Banner>

        <Banner src="/static/images/home/fg.jpg" topMargin={30}>
          <h1 className={templateStyles.headerHome}>
            Family Group
          </h1>
          <div className={styles.subtitle}>
            <h3>
              You haven't checked out GCC if you haven't checked out our family groups.
            </h3>
            <a href="/familygroup">
              <button className={styles.infoButton}>Sign Up Here</button>
            </a>
          </div>
        </Banner>

        <Banner src="/static/images/home/events.jpg" topMargin={20}>
          <h1 className={templateStyles.headerHome}>
            Events
          </h1>
          <div className={styles.subtitle}>
              {this.props.data.map(eventObj => (
                <EventBox
                  eventName={eventObj.title}
                  eventDate={new Date(eventObj.startDate).toLocaleDateString()}
                  key={eventObj._id}
                />
              ))}
          </div>
          <div className="subtitle">
            <a href="/events">
              <button className={styles.infoButton}>More Info</button>
            </a>
          </div>
        </Banner>

        <BannerBibleVerse
          className="bibleVerse"
        />
      </div>
    );
  }
}

const withData = connect((state) => {
  const modelData = state.modelData[pluralize('Event')];
  return {
    data: modelData ? modelData.ids.map(id => modelData.__DB__[id]) : [],
  }
}, (dispatch, ownProps) => {
  return {
    fetchData() {
      return dispatch(fetchModelData('Event'));
    }
  }
});

export default compose(withData, withTitle(), withRouter)(Home);
