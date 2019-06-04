import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StoriesTable from '../../components/presentational/PlanningView/StoriesTable/StoriesTable';
import {
  getSprintActiveStoryVotes, getSprintDetails, getSprintStories
} from '../../redux/actions/PlanningViewActions';
// import styles from './DeveloperView.scss';
// import PropTypes from 'prop-types';

class DeveloperView extends Component {
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

  render() {
    return (
      <div>
        <div id="stories-table">
          <StoriesTable
            stories={this.props.stories}
          />
        </div>
      </div>
    );
  }
}

DeveloperView.propTypes = {};

const mapStateToProps = (state) => ({
  stories: state.planningView.stories
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getSprintDetails,
  getSprintStories,
  getSprintActiveStoryVotes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperView);
