import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const StoryFinalizing =
  ({ votingCanEnd, finalizeStory, storyName, handleFinalPointChange, finalPointError }) => (
  <div style={{ marginTop: 16 }}>
    {
      // Control if everyone has voted.
      // If yes, show input area and submit button
      // If no, show a message
      votingCanEnd() ?
        <div>
          <h5>
            Everyone voted, please discuss and finalize story.
          </h5>
          <Form onSubmit={finalizeStory} error={finalPointError}>
            <Form.Input
              error={finalPointError}
              placeholder={'Please enter the agreed result.'}
              label={'Final Point'}
              onChange={handleFinalPointChange}
              type={'number'}
            />
            <ErrorMessage message={'Please enter a valid scrum point.'} />
            <Form.Button
              content={`End Voting for ${storyName}`}
              color={'green'} inverted fluid
            />
          </Form>
        </div> :
        <h5 style={{ textAlign: 'center' }}>
          You cannot end voting till each teammate voted.
        </h5>
    }
  </div>
);

StoryFinalizing.propTypes = {
  votingCanEnd: PropTypes.func.isRequired,
  finalizeStory: PropTypes.func.isRequired,
  handleFinalPointChange: PropTypes.func.isRequired,
  storyName: PropTypes.string.isRequired,
  finalPointError: PropTypes.bool.isRequired,
};

export default StoryFinalizing;
