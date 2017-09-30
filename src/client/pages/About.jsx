import React, {Component} from 'react';
import withTitle from '../hoc/withTitle';
import Jumbotron from '../components/Jumbotron';
import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';

class About extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={{height: '60vh'}}>
          <BackgroundImage src="/static/images/home/philly.jpg" backgroundSize="cover" backgroundPosition="top left" />
          <Center vertical horizontal>
            <div className="container">
              <h2 style={{color: 'white'}}>Who We Are</h2>
            </div>
          </Center>
        </Jumbotron>
        <Jumbotron style={{ paddingTop: '125px', paddingBottom: '125px' }}>
          <Center horizontal>
            <div className="container">
              <h3>Welcome! We’re glad you’re exploring our University City Site! As you take a look around, we hope you will catch a glimpse of what God is doing at GCC University City.</h3>
              <em>~~ Click the links below to learn more about who we are ~~</em>
            </div>
          </Center>
        </Jumbotron>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">I'm New</div>
            <div className="col-sm-3">Beliefs</div>
            <div className="col-sm-3">Meet Our Staff</div>
            <div className="col-sm-3">AMI</div>
          </div>
        </div>
      </div>
    );
  }
};

export default withTitle('About')(About);
