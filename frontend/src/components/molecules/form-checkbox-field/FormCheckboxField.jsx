import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormCheckboxField = ({
  label, name, className,
  disabled, value
}) => {

  const [fieldValue, setFieldValue] = useState(value);
  useEffect(() => setFieldValue(value), [value]);

  return (
    <Form.Group className={className}>
      <Form.Check type="checkbox" name={name} label={label} disabled={disabled} checked={!!fieldValue} value={fieldValue} onChange={e => setFieldValue(!fieldValue)} />
    </Form.Group>
  );
};

FormCheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default FormCheckboxField;