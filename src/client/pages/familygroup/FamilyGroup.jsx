import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';

import TitleBanner from '../../components/TitleBanner';
import TableRow from '../../components/TableRow';

import styles from './FamilyGroup.css';

class FamilyGroup extends Component {
  render() {
    return (
      <div id={styles.familyGroup}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/FamilyGroup.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/headers/fg.jpg">
          Family Group
        </TitleBanner>

        <div className={styles.pageContent}>
          <div className="description">
            At GCC we place a high emphasis on Family Groups because we believe that it is in
            these smaller settings that we are able to meet with God, building meaningful relationships,
            and develop biblical accountability. Family groups meet on a weekly basis at various places.
            <br></br>
            <br></br>
            Through Bible study, discussions, sharing and prayer,
            we learn to live out the teachings of the Bible in our daily lives.
            You are strongly encouraged to join a family group that fits your needs,
            interests and life situation.
            <br></br>
            <br></br>
            Family groups are divided between the Harvest (undergraduate), Crossroad (post-college),
            and International groups.
            <br></br>
            <br></br>
            Please watch the video below to learn more!
          </div>

          <div className={styles.video}>Video Placeholder Div</div>

          <div className={styles.signupTable}>
            <TableRow
              className={styles.tableRow}
              title="College"
              days="Mondays to Thursdays"
              description="Our College Family Groups meet once a week on Drexel, Moore, Penn, Temple, and USciences!"
              signupLink="#"></TableRow>
            <TableRow
              className={styles.tableRow}
              title="Young Adults"
              days="Mondays to Thursdays"
              description="Our Young Adult Family Groups have a mix of post-undergraduate, grad students, PhD's, working adults, and young married couples."
              signupLink="#"></TableRow>
            <TableRow
              className={styles.tableRow}
              title="International"
              days="Thursdays"
              description="Description needed"
              signupLink="#"></TableRow>
          </div>
        </div>
      </div>
    );
  }
};

export default withTitle('Family Group')(FamilyGroup);
