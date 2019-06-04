import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import { voteText } from '../../../../utils';

const VoteResults = ({ votes, details }) => (
  <div>
    <div className="row">
      <div className="col">Scrum Master:</div>
      <div className="col">{voteText(votes, 0)}</div>
    </div>
    {
      !!details.details &&
      !!details.details.vote_count &&
      times(details.details.vote_count - 1, (i) => (
        <div className="row" key={`voter-${i}`}>
          <div className="col">Voter {i + 1}:</div>
          <div className="col">{voteText(votes, i + 1)}</div>
        </div>
      ))
    }
  </div>
);

VoteResults.propTypes = {
  votes: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
};

export default VoteResults;
