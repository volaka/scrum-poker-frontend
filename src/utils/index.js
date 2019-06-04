import indexOf from 'lodash/indexOf';
import has from 'lodash/has';

export const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 999];

/***
 * Takes votes as an argument,
 * if voter voted, returns the point
 * if not, returns -1.
 *
 * @param {Object} votes
 * @param {number} voter
 * @param {Array<Object>} votes.votes
 * @returns {number}
 */
export const didVote = (votes, voter) => {
  if (votes.votes.filter(v => v.voter === voter).length > 0) {
    return votes.votes.filter(v => v.voter === voter)[0].point;
  }
  return -1;
};

/***
 * Takes votes and voter as argument,
 * checks if voter did vote.
 * If voted, returns the vote or else
 * returns Not Voted.
 *
 * @param {Object} votes
 * @param {Array<Object>} votes.votes
 * @param {number} voter
 * @returns {string || number}
 */
export const voteText = (votes, voter) => {
  const didVoteResult = didVote(votes, voter);
  // eslint-disable-next-line no-nested-ternary
  return didVoteResult === -1 ?
    'Not Voted' :
    didVoteResult === 999 ?
      '?' : didVoteResult;
};

/***
 * Takes votes as an argument,
 * if voters voted, returns the vote id
 * if not, returns -1.
 *
 * @param {Object} votes
 * @param {Array<Object>} votes.votes
 * @param {number} voter
 * @returns {number}
 */
export const voteId = (votes, voter) => {
  if (votes.votes.filter(v => v.voter === voter).length > 0) {
    return votes.votes.filter(v => v.voter === voter)[0].id;
  }
  return -1;
};

/***
 * Takes stories state as an argument and
 * returns the name of the active story if
 * there is any.
 * @param {Object} stories
 * @param {Array<Object>} stories.stories
 * @returns {string}
 */
export const getActiveStoryName = (stories) => {
  // Get story list from redux state
  const storyList = stories.stories;
  // Check if there are stories.
  // If there are stories, filter the one with Active status
  // If not, assign empty array
  const activeStory = storyList.length > 0 ? storyList.filter(s => s.status === 'Active') : [];
  // If there are any active story
  // Get its name, or assign no active story
  return activeStory.length > 0 ? activeStory[0].name : 'There are no active stories';
};

/***
 * Takes stories state as an argument and
 * returns the id of the active story if
 * there is any.
 * @param {Object} stories
 * @param {Array<Object>} stories.stories
 * @returns {number || null}
 */
export const getActiveStoryId = (stories) => {
  // Get story list from redux state
  const storyList = stories.stories;
  // Check if there are stories.
  // If there are stories, filter the one with Active status
  // If not, assign empty array
  const activeStory = storyList.length > 0 ? storyList.filter(s => s.status === 'Active') : [];
  // If there are any active story
  // Get its id, or assign null
  return activeStory.length > 0 ? activeStory[0].id : null;
};

/***
 * Checks is the given point is in the scrum points array
 * @param {number} point
 * @returns {boolean}
 */
export const isValidPoint = (point) => indexOf(points, point) !== -1;

export const votingCanEnd = (votes, details) => {
  if (has(details, 'details.vote_count')) {
    return details.details.vote_count === votes.votes.length;
  }
  return false;
};
