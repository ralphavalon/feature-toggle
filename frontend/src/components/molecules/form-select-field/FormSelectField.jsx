import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SelectMulti from '../../atoms/select-multi';

const FormSelectField = ({
  label, name, className,
  disabled, value, placeholder,
  options, invalidMessage
}) => {

  const [fieldValue, setFieldValue] = useState(value);
  useEffect(() => setFieldValue(value), [value]);

  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>
      <SelectMulti name={name} disabled={disabled} value={fieldValue} onChange={e => setFieldValue(e)} options={options}
        placeholder={placeholder}/>
      {invalidMessage && <Form.Control.Feedback type="invalid" className="d-block">{invalidMessage}</Form.Control.Feedback>}
    </Form.Group>
  );
};

FormSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inputProps: PropTypes.object,
  options: PropTypes.array,
  value: PropTypes.array,
};

export default FormSelectField;