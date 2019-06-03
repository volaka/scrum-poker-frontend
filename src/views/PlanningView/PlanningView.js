import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import styles from './PlanningView.scss';
// import PropTypes from 'prop-types';

class PlanningView extends Component {
  render() {
    return (
      <div>
        <h1>PlanningView</h1>
      </div>
    );
  }
}

PlanningView.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlanningView);
