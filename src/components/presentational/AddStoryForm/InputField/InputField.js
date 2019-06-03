import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const InputField = ({ error, label, name, onChange, placeholder, value }) => (
  <Form.Field error={!!error}>
    <label>{label}</label>
    <Input
      name={name} onChange={onChange}
      fluid placeholder={placeholder}
      value={value}
    />
    {!!error && <ErrorMessage message={error} />}
  </Form.Field>
);

InputField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputField;
