import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import withTitle from '../hoc/withTitle';
import {setTitle} from '../modules/metadata';
import {fetchPage} from '../modules/page';

class AsyncPage extends Component {

  static fetchData({dispatch}, match) {
    return dispatch(fetchPage(match.params.page)).then(result => dispatch(setTitle(result.title)));
  }

  componentDidMount() {
    this.props.fetchPage();
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.content}</div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch, ownProps) {
  const page = ownProps.match.params.page;
  return {
    fetchPage() {
      return dispatch(fetchPage(page)).then(result => dispatch(setTitle(result.title)));
    }
  }
}

export default connect(state => state.page, mapDispatchToProps)(AsyncPage);
