import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';
import Jumbotron from '../components/Jumbotron';
const styles = (typeof CSS !== 'undefined') && require('./Home.css');

const mainAnnouncements = [
  {
    title: 'Sign up for family groups',
    content: 'You haven\'t checked out GCC unless you\'ve checked out our family groups',
    link: '/page',
    internalLink: true,
    image: '/static/images/home/philly.jpg',
  },
  {
    title: 'Crossroad retreat',
    content: 'Click here to sign up for Crossroads Retreat!',
    link: 'http://google.com',
    internalLink: false,
    image: '/static/images/home/philly.jpg',
  },
];

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>
        <Jumbotron style={{height: '80vh'}}>
          <BackgroundImage src="/static/images/home/philly.jpg" backgroundSize="cover" backgroundPosition="top left" />
          <Center vertical horizontal>
            <div className="container">
              <h1 style={{color: 'white'}}>Grace Covenant Church</h1>
            </div>
          </Center>
        </Jumbotron>
        <Jumbotron style={{ paddingTop: '125px', paddingBottom: '125px' }}>
          <Center horizontal>
            <div className="container">
              <h2>Raising up Kingdom Workers<br /> Who are Transformed by Christ<br/>To Influence the World</h2>
            </div>
          </Center>
        </Jumbotron>
        <div id="mainAnnouncements">
          {mainAnnouncements.map((announcement, i) => {
            return (
              <Jumbotron style={{height: '60vh'}} key={i}>
                <BackgroundImage
                  src={announcement.image}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundAttachment="fixed"
                />
                <Center vertical horizontal>
                  <div className="container">
                    <div className="announcement">
                      <div className="container-fluid">
                        <h3>{announcement.title}</h3>
                        {
                          announcement.internalLink ?
                          <Link to={announcement.link || '#'}>{announcement.content}</Link> :
                          <a href={announcement.link || '#'}>{announcement.content}</a>
                        }
                      </div>
                    </div>
                  </div>
                </Center>
              </Jumbotron>
            );
          })}
        </div>
        <div className="container">
          <div className="row" style={{textAlign: 'center'}}>
            <div className="col-sm-3">
              <h3>Family Groups</h3>
              <p>Get to know the people you see on Sundays by studying the Word together</p>
              <Link to="/familygroup">Learn more here</Link>
            </div>
            <div className="col-sm-3">
              <h3>Ministries</h3>
              <p>Learn about the ways to serve God and His people</p>
              <Link to="/ministries">Learn more here</Link>
            </div>
            <div className="col-sm-3">
              <h3>Giving</h3>
              <p>Learn more about how to give</p>
              <Link to="/giving">Learn more here</Link>
            </div>
            <div className="col-sm-3">
              <h3>Sign up for daily devotionals</h3>
              <p>Daily devotionals for the AMI community of churches.</p>
              <a href="https://amiquiettimes.com/" target="_blank">Read and subscribe here</a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row info">
              <h2 style={{textAlign: 'center'}}>Announcements</h2>
              <ul>
                <li>Family Group is where you can grow in Christ as you study the Word, pray, and fellowship together with a small group of brothers and sisters in Christ. Please sign up online for our fall family groups!</li><li>Please continue to join AMI for our daily devotionals at the AMI Quiet Times website. Download the Acts Ministries International mobile app (available on both the Google Play Store and the Apple App Store), and join us in staying close to the Father by remaining in His Word.</li>
                <li>Morning prayer is held on Friday mornings at 7am in at Ralston House (36th &amp; Chestnut St.)</li>
                <li>Let’s keep praying for the Grace Covenant Church Singapore! Also check out their new website! Their Sunday services and small groups have started and they are reaching out to their community. Please consider building up God’s Kingdom in Singapore through your faith pledges, offerings and prayers. Please include your name on your check.</li>
                <li>Please also continue to pray for our one-year missionary interns!</li>
              </ul>
          </div>
        </div>
        <Jumbotron style={{ paddingTop: '125px', paddingBottom: '125px' }}>
          <BackgroundImage src="/static/images/home/philly.jpg" backgroundSize="cover" backgroundPosition="center" />
          <Center horizontal>
            <div className="container">
              <h3>Memory Verse of the Month</h3>
              <h2>"Jesus Christ is the same yesterday and today and forever."</h2>
              <h5 className="pull-right">Hebrews 13:8</h5>
            </div>
          </Center>
        </Jumbotron>
      </div>
    );
  }
};

export default withTitle()(Home);
