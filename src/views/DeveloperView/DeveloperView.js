import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import has from 'lodash/has';
import times from 'lodash/times';
import * as classnames from 'classnames';
import StoriesTable from '../../components/presentational/PlanningView/StoriesTable/StoriesTable';
import {
  getSprintActiveStoryVotes, getSprintDetails, getSprintStories
} from '../../redux/actions/PlanningViewActions';
import VotingArea from '../../components/smart/VotingArea/VotingArea';
import styles from './DeveloperView.scss';
// import PropTypes from 'prop-types';

class DeveloperView extends Component {
  state = { voter: -1 };
  componentDidMount() {
    // Make necessary API calls
    // Get Sprint Details, Get Sprint Stories and Get Votes of Active Story
    // eslint-disable-next-line no-shadow
    const { getSprintDetails, getSprintStories, getSprintActiveStoryVotes, match } = this.props;
    getSprintDetails(match.params.name);
    getSprintStories(match.params.name);
    getSprintActiveStoryVotes(match.params.name);
    // Set 2 Second API call interval
    /*
    this.sprintStoriesInterval = setInterval(
      () => getSprintStories(match.params.name),
      2000);
    this.storyVotesInterval = setInterval(
      () => getSprintActiveStoryVotes(match.params.name),
      2000);
     */
  }

  handleVoterSelection = (e, { value }) => {
    this.setState({ voter: value });
  };

  render() {
    const { stories, match, details } = this.props;
    let votersCount = 0;
    if (has(details.details, 'vote_count')) votersCount = details.details.vote_count;
    const voters = times(votersCount - 1, (i) =>
      ({ key: i, value: i + 1, text: `Voter ${i + 1}` }));
    return (
      [
        <div className={classnames('row', styles.section)} key={'voter-section'}>
          <div className="col-12">
            <h5>Select Voter</h5>
            <Dropdown
              placeholder='Voter 1 ...'
              fluid
              search
              selection
              options={voters}
              onChange={this.handleVoterSelection}
            />
          </div>
        </div>,
        <div className={classnames('row', styles.section)} key={'main-section'}>
          {/* Story List Table */}
          <div className="col-8" id={'stories-table-container'}>
            <h5>Story List</h5>
            <StoriesTable stories={stories} />
          </div>
          {/* Voting Card Area */}
          <div className="col-4" id={'voting-area-container'}>
            <VotingArea
              voter={this.state.voter}
              sprintName={match.params.name}
            />
          </div>
        </div>
      ]
    );
  }
}

DeveloperView.propTypes = {};

const mapStateToProps = (state) => ({
  stories: state.planningView.stories,
  details: state.planningView.details
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getSprintDetails,
  getSprintStories,
  getSprintActiveStoryVotes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperView);
