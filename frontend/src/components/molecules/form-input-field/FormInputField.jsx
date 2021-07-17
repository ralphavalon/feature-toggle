import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormInputField = ({
  label, name, inputType, className,
  disabled, value, placeholder, inputProps
}) => {

  const [fieldValue, setFieldValue] = useState(value);
  useEffect(() => setFieldValue(value), [value]);

  const formInputProps = inputType === 'textarea' ? { as: inputType, ...inputProps } : { type: inputType, ...inputProps };

  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control placeholder={placeholder} value={fieldValue || ''} name={name} disabled={disabled}
        onChange={e => setFieldValue(e.target.value)} {...formInputProps} />
    </Form.Group>
  );
};

FormInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inputProps: PropTypes.object,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default FormInputField;