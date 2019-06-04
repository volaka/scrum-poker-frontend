import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import styles from './CardGroup.scss';
import { didVote, points } from '../../../../utils';

const CardGroup = ({ votes, storyName, voter, handleVoting }) => (
  <div className={styles['card-group']} id={'card-group'}>
    <span className={styles['vote-header']}>{storyName}</span>
    <Card.Group itemsPerRow={4} centered>
      {
        points.map(p => (
          <Card
            key={p}
            header={p === 999 ? '?' : p}
            color={didVote(votes, voter) === p ? 'orange' : 'black'}
            onClick={() => handleVoting(p)}
            raised
          />
        ))
      }
      {
        didVote(votes, voter) === -1 ?
          <Card fluid header={'Please VOTE!!'} className={styles['card-footer']} /> :
          <Card fluid header={'Thank You for Voting!'} className={styles['card-footer']} />
      }
    </Card.Group>
  </div>
);

CardGroup.propTypes = {
  votes: PropTypes.object.isRequired,
  storyName: PropTypes.string.isRequired,
  voter: PropTypes.number.isRequired,
  handleVoting: PropTypes.func.isRequired,
};

export default CardGroup;
