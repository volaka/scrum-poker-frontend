import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import styles from './TextAreaField.scss';

const TextAreaField = ({ error, label, name, onChange, placeholder, value }) => (
  <Form.Field error={!!error}>
    <label>{label}</label>
    <TextArea
      className={styles.textarea}
      name={name} onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    {!!error && <ErrorMessage message={error} />}
  </Form.Field>
);

TextAreaField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextAreaField;
