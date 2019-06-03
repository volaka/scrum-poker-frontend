import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './PlanningView.scss';
import { getSprintDetails, getSprintStories } from '../../redux/actions/PlanningViewActions';
import StoriesTable from '../../components/presentational/PlanningView/StoriesTable/StoriesTable';

class PlanningView extends Component {
  componentDidMount() {
    this.props.getSprintDetails(this.props.match.params.name);
    this.props.getSprintStories(this.props.match.params.name);
  }

  render() {
    const { stories } = this.props.planningViewState;
    return (
      <div className={classnames('row', styles['planning-container'])}>
        <div className="col">
          <h5>Story List</h5>
          <StoriesTable stories={stories.stories} loading={stories.loading} error={stories.error} />
        </div>
        <div className="col">
          <h5>Active Story</h5>

        </div>
        <div className="col">
          <h5>Results</h5>
        </div>
      </div>
    );
  }
}

PlanningView.propTypes = {
  router: PropTypes.object.isRequired,
  getSprintDetails: PropTypes.func.isRequired,
  getSprintStories: PropTypes.func.isRequired,
  planningViewState: PropTypes.object.isRequired,
};

const mapStateToProps = ({ router, planningView }) => ({
  router,
  planningViewState: planningView
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getSprintDetails,
  getSprintStories,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlanningView);
