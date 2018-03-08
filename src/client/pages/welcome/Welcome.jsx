import nconf from 'nconf';
import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';
import BackgroundImage from '../../components/BackgroundImage';
import Center from '../../components/Center';
import TitleBanner from '../../components/TitleBanner';
import Jumbotron from '../../components/Jumbotron';
import AspectRatio from '../../components/AspectRatio';

import styles from './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div id={styles.welcome}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="public/assets/pages/welcome/Welcome.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/headers/welcome.jpg">
          <Center horizontal vertical>
            Welcome!
          </Center>
        </TitleBanner>

        <div className={styles.pageContent}>
          <div className="description">
            Our doors are wide open to people from all backgrounds. Whether you are a spiritual seeker just beginning to ask questions about God or a committed Christian wanting to deepen your faith, Grace Covenant Church is a place you can call home and find spiritual help, hope, and encouragement. Wherever you are in your spiritual journey, we invite you to discover GCC—and discover for yourself God’s wonderful love and plan for your life!
          </div>

          <div className={styles.video}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5M8H4xhSPWc" frameBorder="0" allowFullScreen="true"></iframe>
          </div>

          <div className="description">
            What makes us unique? It isn’t our beliefs. We affirm the same basic Christian doctrines that have been a part of the Church for hundreds of years. Rather, we are committed to presenting these truths in a practical, relevant, contemporary, and loving manner. Our desire is to introduce you to Jesus Christ and to help you grow and become a kingdom worker. We want to help you to become a kingdom worker who can influence the world around you with the love of Jesus Christ.
            <br/> <br/>
            Our church is comprised of a network of “family groups“; small group settings where honest friendships, Bible study, constant prayer, and compassionate care are emphasized. It is within these dynamic family groups where the core of our evangelism and discipleship take place. We invite you to become of a part of these contagious Christian communities that strive to influence and encourage one another.
            <br/> <br/>
            Again, whether you’re a spiritual seeker who’s just starting to ask questions about God, or a committed Christian who wants to sink the roots of your faith even deeper, you can find a home here at Grace Covenant Church.
            <br/> <br/>
            Our Sunday Services and Friday Night Large Groups are typically located at Meyerson Hall Room B-1, 3401 Walnut Street Philadelphia, PA 19104. We oftentimes meet at Ralston House, 3615 Chestnut Street Philadelphia, PA 19104, as well. Keep an eye out for Grace Covenant Church signs and our welcomers to find us!
          </div>

          <div className="row">
            <div className="col-sm-6">
              <AspectRatio ratio={4/3}>
                <iframe frameBorder="0" src={`https://www.google.com/maps/embed/v1/place?q=Meyerson+Hall,+Philadelphia,+PA,+United+States&key=${nconf.get('GOOGLE_MAPS_KEY')}`} style={{width: '100%', height: '100%'}} />
              </AspectRatio>
            </div>
            <div className="col-sm-6">
              <AspectRatio ratio={4/3}>
                <iframe frameBorder="0" src={`https://www.google.com/maps/embed/v1/place?q=Ralston+House,+Chestnut+Street,+Philadelphia,+PA,+United+States&key=${nconf.get('GOOGLE_MAPS_KEY')}`} style={{width: '100%', height: '100%'}} />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withTitle()(Welcome);
