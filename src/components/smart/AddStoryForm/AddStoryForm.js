import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { stripIndent } from 'common-tags';
import ErrorMessage from '../../presentational/ErrorMessage/ErrorMessage';
import InputField from '../../presentational/AddStoryForm/InputField/InputField';
import TextAreaField from '../../presentational/AddStoryForm/TextAreaField/TextAreaField';

class AddStoryForm extends Component {
  state = {
    name: '',
    voter: '',
    storyList: '',
    nameError: '',
    voterError: '',
    storyListError: '',
    formError: ''
  };

  handleChange = (e, { name, value }) => {
    const newState = {};
    // Controls input areas and creates errors if necessary
    if (name === 'voter') {
      // Error check for voter count input
      // If voter count is 0 or
      // Voter count is negative, creates an error
      let errorText = '';
      const valueNumber = parseInt(value, 10);
      if (valueNumber === 0) errorText = 'Voter count cannot be 0 (zero).';
      else if (valueNumber < 0) errorText = 'Voter count cannot be negative.';
      newState.voterError = errorText;
    } else if (name === 'name') {
      // Error check for name input
      // Creates error if input length is bigger than 200 characters.
      let errorText = '';
      if (value.length > 200) errorText = 'Name cannot be more than 200 characters.';
      newState.nameError = errorText;
    } else {
      // Error cleaner for textarea if written something.
      newState.storyListError = '';
    }
    newState[name] = value;
    this.setState(() => (newState));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, voter, storyList, nameError, voterError, storyListError } = this.state;
    // Field controls before submitting the form

    // Control if any field is empty.
    if (!name || !voter || !storyList) {
      // If empty, set state with the appropriate error message
      // And show the field error
      const newState = {};
      if (!name) newState.nameError = 'Name cannot be empty.';
      if (!voter) newState.voterError = 'Voter count cannot be empty.';
      if (!storyList) newState.storyListError = 'Story List cannot be empty.';
      this.setState(newState);
    } else if (!!nameError || !!voterError || !!storyListError) {
      // If there are any errors as text limit or negative number
      // Show a global error
      this.setState({ formError: 'Please control all the fields and fix the errors.' });
    } else {
      // If there are no errors, submit the request
      console.log(this.state);
    }
  };

  render() {
    const { name, voter, storyList, voterError, nameError, storyListError, formError } = this.state;
    return (
      <Form
        error={!!voterError || !!nameError || !!storyListError || !!formError}
        onSubmit={this.handleSubmit}
      >
        {!!formError && <ErrorMessage message={formError} />}
        <Form.Group widths='equal'>
          <InputField
            placeholder={'Sprint 1'}
            onChange={this.handleChange}
            value={name}
            error={nameError}
            label={'Session Name'}
            name={'name'}
          />
          <InputField
            label={'Voter Count'}
            onChange={this.handleChange}
            placeholder={'5'}
            value={voter}
            name={'voter'}
            error={voterError}
            type={'number'}
          />
        </Form.Group>
        <TextAreaField
          name={'storyList'}
          value={storyList}
          onChange={this.handleChange}
          error={storyListError}
          label={'Paste your story list. (Each line will be converted as a story)'}
          placeholder={
            stripIndent`
                  Story1
                  Story2
                  Story3
                  Story4
                  ...
                  `}
        />
        <Form.Button
          primary floated={'right'}
          content={'Start Session'} style={{ marginLeft: 'auto' }}
        />
      </Form>
    );
  }
}

AddStoryForm.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddStoryForm);
