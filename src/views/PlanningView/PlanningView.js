import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './PlanningView.scss';
import {
  getSprintActiveStoryVotes, getSprintDetails, getSprintStories
} from '../../redux/actions/PlanningViewActions';
import StoriesTable from '../../components/presentational/PlanningView/StoriesTable/StoriesTable';
import VotingArea from '../../components/smart/VotingArea/VotingArea';
import { getActiveStoryName } from '../../utils';
import ScrumMasterPortal from '../../components/smart/ScrumMasterPortal/ScrumMasterPortal';

class PlanningView extends Component {
  componentDidMount() {
    // Make necessary API calls
    // Get Sprint Details, Get Sprint Stories and Get Votes of Active Story
    // eslint-disable-next-line no-shadow
    const { getSprintDetails, getSprintStories, getSprintActiveStoryVotes, match } = this.props;
    getSprintDetails(match.params.name);
    getSprintStories(match.params.name);
    getSprintActiveStoryVotes(match.params.name);
    // Set 2 Second API call interval
    this.sprintStoriesInterval = setInterval(
      () => getSprintStories(match.params.name),
      2000);
    this.storyVotesInterval = setInterval(
      () => getSprintActiveStoryVotes(match.params.name),
      2000);
  }

  componentWillUnmount() {
    // Clear intervals when unmounting.
    clearInterval(this.sprintStoriesInterval);
    clearInterval(this.storyVotesInterval);
  }

  render() {
    const { stories } = this.props.planningViewState;
    const storyName = getActiveStoryName(stories);
    return (
      <div className={classnames('row', styles['planning-container'])} id={'planning-container'}>
        {/* Story List Table */}
        <div className="col" id={'stories-table-container'}>
          <h5>Story List</h5>
          <StoriesTable stories={stories} />
        </div>
        {/* Voting Card Area */}
        <div className="col" id={'voting-area-container'}>
          <VotingArea
            voter={0}
            sprintName={this.props.match.params.name}
          />
        </div>
        {/* Control Panel */}
        <div className="col" id={'portal-container'}>
          <ScrumMasterPortal
            storyName={storyName}
            sprintName={this.props.match.params.name}
          />
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
  getSprintActiveStoryVotes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlanningView);
