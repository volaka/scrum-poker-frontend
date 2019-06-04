import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ScrumMasterPortal.scss';
import { isValidPoint, votingCanEnd } from '../../../utils';
import { finalizeStory } from '../../../redux/actions/PlanningViewActions';
import PortalHeader from '../../presentational/ScrumMasterPortal/PortalHeader/PortalHeader';
import VoteResults from '../../presentational/ScrumMasterPortal/VoteResults/VoteResults';
// eslint-disable-next-line max-len
import StoryFinalizing from '../../presentational/ScrumMasterPortal/StoryFinalizing/StoryFinalizing';

class ScrumMasterPortal extends Component {
  state = { finalPoint: '', finalPointError: false };

  finalizeStoryRequest = () => {
    if (isValidPoint(this.state.finalPoint)) {
      this.props.finalizeStory(this.props.sprintName, this.state.finalPoint);
    }
  };

  handleFinalPointChange = (e, { value }) => {
    const valueCasting = parseInt(value, 10);
    const finalPointError = value === '' ? false : !isValidPoint(valueCasting);
    this.setState({
      finalPoint: valueCasting,
      finalPointError
    });
  };

  render() {
    const { storyName, votes, details } = this.props;
    return (
      <div>
        <h5>Scrum Master Portal</h5>
        <div className={styles['portal-container']}>
          <PortalHeader storyName={storyName} />
          <VoteResults details={details} votes={votes} />
          <StoryFinalizing
            finalPointError={this.state.finalPointError}
            handleFinalPointChange={this.handleFinalPointChange}
            votingCanEnd={() => votingCanEnd(votes, details)}
            storyName={storyName}
            finalizeStory={this.finalizeStoryRequest}
          />
        </div>
      </div>
    );
  }
}

ScrumMasterPortal.propTypes = {
  storyName: PropTypes.string.isRequired,
  sprintName: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  votes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  details: state.planningView.details,
  votes: state.planningView.votes
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  finalizeStory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrumMasterPortal);
