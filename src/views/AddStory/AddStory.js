import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AddStory.scss';
import AddStoryForm from '../../components/smart/AddStoryForm/AddStoryForm';

class AddStory extends Component {
  render() {
    return (
      <div className={classnames('row', styles['add-container'])}>
        <div className="col">
          <AddStoryForm />
        </div>
      </div>
    );
  }
}

AddStory.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddStory);
