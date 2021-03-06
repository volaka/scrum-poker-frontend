import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardGroup from '../../presentational/VotingArea/CardGroup/CardGroup';
import { didVote, getActiveStoryId, getActiveStoryName, voteId } from '../../../utils';
import { voteStory, changeVote } from '../../../redux/actions/SprintActions';

class VotingArea extends Component {
  handleVoting = (point) => {
    const { votes, voter, stories, sprintName } = this.props;
    const storyId = getActiveStoryId(stories);
    const voterVoteResult = didVote(votes, voter);
    if (this.props.voter === -1) {
      alert('Please select voter first');
      return;
    }
    if (storyId) {
      if (voterVoteResult === -1) this.props.voteStory(storyId, point, voter, sprintName);
      else this.props.changeVote(voteId(votes, voter), point, sprintName);
    }
  };

  render() {
    const { votes, voter, stories } = this.props;
    const storyName = getActiveStoryName(stories);
    return (
      <div>
        <h5>Active Story</h5>
        <CardGroup
          storyName={storyName}
          voter={voter}
          votes={votes}
          handleVoting={this.handleVoting}
        />
      </div>
    );
  }
}

VotingArea.propTypes = {
  votes: PropTypes.object.isRequired,
  stories: PropTypes.object.isRequired,
  voter: PropTypes.number.isRequired,
  voteStory: PropTypes.func.isRequired,
  sprintName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  votes: state.sprint.votes,
  stories: state.sprint.stories,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  voteStory,
  changeVote
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VotingArea);
