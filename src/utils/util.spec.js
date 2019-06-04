import {
  getActiveStoryId, getActiveStoryName,
  didVote, voteText, voteId, isValidPoint, votingCanEnd
} from './index';

const details = {
  loading: false,
  error: null,
  details: {
    id: 7,
    name: 'Sprint 1',
    vote_count: 5,
    dev_link: 'Sprint 1'
  }
};
const stories1 = [{ id: 2, name: 'Story1', status: 'Active' }];
const stories2 = [
  { id: 2, name: 'Story1', status: 'Voted' },
  { id: 3, name: 'Story2', status: 'Active' },
  { id: 4, name: 'Story3', status: 'Not Voted' }
];
const votes = {
  loading: false,
  error: null,
  votes: [
    { id: 1, name: 'Story1', point: 3, voter: 0 },
    { id: 2, name: 'Story1', point: 5, voter: 1 },
    { id: 3, name: 'Story1', point: 999, voter: 2 }
  ]
};
const votes2 = {
  loading: false,
  error: null,
  votes: [
    { id: 1, name: 'Story1', point: 3, voter: 0 },
    { id: 2, name: 'Story1', point: 5, voter: 1 },
    { id: 3, name: 'Story1', point: 3, voter: 2 },
    { id: 4, name: 'Story1', point: 3, voter: 3 },
    { id: 5, name: 'Story1', point: 8, voter: 4 }
  ]
};

describe('Util Functions', () => {
  test('Should name return "There are no active stories"', () => {
    expect(getActiveStoryName({ stories: [] })).toBe('There are no active stories');
  });
  test('Should name return appropriate name', () => {
    expect(getActiveStoryName({ stories: stories1 })).toBe('Story1');
    expect(getActiveStoryName({ stories: stories2 })).toBe('Story2');
  });

  test('Should id return "null"', () => {
    expect(getActiveStoryId({ stories: [] })).toBe(null);
  });
  test('Should id return appropriate id', () => {
    expect(getActiveStoryId({ stories: stories1 })).toBe(2);
    expect(getActiveStoryId({ stories: stories2 })).toBe(3);
  });
  test('Should didVote return -1 when votes are empty', () => {
    expect(didVote({ votes: [] }, 0)).toBe(-1);
    expect(didVote({ votes: [] }, 3)).toBe(-1);
    expect(didVote({ votes: [] }, 5)).toBe(-1);
  });
  test('Should didVote return -1" when voter didn\'t vote', () => {
    expect(didVote(votes, 3)).toBe(-1);
  });
  test('Should didVote return vote point when voter did vote', () => {
    expect(didVote(votes, 0)).toBe(3);
    expect(didVote(votes, 1)).toBe(5);
  });
  test('Should voteText return vote point when voter did vote and Not Voted when did not.', () => {
    expect(voteText(votes, 0)).toBe(3);
    expect(voteText(votes, 1)).toBe(5);
    expect(voteText(votes, 2)).toBe('?');
    expect(voteText(votes, 3)).toBe('Not Voted');
    expect(voteText(votes, 4)).toBe('Not Voted');
});
  test('Should voteId return vote id when voter did vote and -1 when did not.', () => {
    expect(voteId(votes, 0)).toBe(1);
    expect(voteId(votes, 1)).toBe(2);
    expect(voteId(votes, 2)).toBe(3);
    expect(voteId(votes, 3)).toBe(-1);
    expect(voteId(votes, 4)).toBe(-1);
  });
  test('Should isValidPoint checks if the given point is in the points array.', () => {
    expect(isValidPoint(0)).toBe(false);
    expect(isValidPoint(1)).toBe(true);
    expect(isValidPoint(2)).toBe(true);
    expect(isValidPoint(3)).toBe(true);
    expect(isValidPoint(5)).toBe(true);
    expect(isValidPoint(8)).toBe(true);
    expect(isValidPoint(10)).toBe(false);
    expect(isValidPoint(20)).toBe(false);
    expect(isValidPoint(100)).toBe(false);
    expect(isValidPoint(144)).toBe(true);
  });
  test('Should votingCanEnd return true if vote_count and votes.length is equal', () => {
    expect(votingCanEnd(votes, { datails: {} })).toBe(false);
    expect(votingCanEnd(votes, details)).toBe(false);
    expect(votingCanEnd(votes2, details)).toBe(true);
  });
});
