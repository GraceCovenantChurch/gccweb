import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';
import pluralize from 'pluralize';

import Center from '../../components/Center';
import TitleBanner from '../../components/TitleBanner';
import Banner from '../../components/Banner';
import TableRow from '../../components/TableRow';
import {fetchModelData} from '../../modules/modelData';


import styles from './Ministries.css';

class Ministries extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let ministryList = this.props.data.map((ministryObj) => {return ministryObj['name']});
    // let ministryList = ['Diakonos', 'Evangelism', 'Finance', 'Graphics', 'Hospitality', 'Multimedia',
    //  'Overflow', 'Transportation', 'Worship', 'Welcoming', 'Web'];

    return (
      <div id={styles.ministries}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Ministries.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/headers/ministries.jpg">
          <Center horizontal vertical>
            Ministries
          </Center>
        </TitleBanner>

        <div className={styles.pageContent}>
          {ministryList.map( (minName) => {
                  return (
                    <div className={styles.ministryBox} key={minName}>
                      <Center vertical>{minName}</Center>
                    </div>
                  )
                })}
        </div>
      </div>
    );
  }
};

const withData = connect((state) => {
  const modelData = state.modelData[pluralize('Ministry')];
  return {
    data: modelData ? modelData.ids.map(id => modelData.__DB__[id]) : [],
  }
}, (dispatch, ownProps) => {
  return {
    fetchData() {
      return dispatch(fetchModelData('Ministry'));
    }
  }
});

export default compose(withData, withTitle(ownProps => pluralize('Ministry')), withRouter)(Ministries);
