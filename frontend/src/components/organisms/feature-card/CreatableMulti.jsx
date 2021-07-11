import React from 'react';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';

const showValue = value => {
  if (!value) return null;
  let response = [];

  if (value.length > 0 && typeof value[0] === 'string') {
    for (let i in value) {
      response.push({ value: value[i], label: value[i] });
    }
  }
  return response;
};

const toPlanList = value => {
  if (!value) return null;
  let response = [];

  if (value.length > 0 && typeof value[0].value === 'string') {
    for (let i in value) {
      response.push(value[i].value);
    }
  }
  return response;
};

const CreatableMulti = ({ name, value, onChange, options, placeholder, disabled }) => {

  return (
    <CreatableSelect
      isMulti
      name={name}
      value={showValue(value)}
      onChange={(option) => {
        onChange(toPlanList(option));
      }}
      isDisabled={disabled}
      placeholder={placeholder}
      options={showValue(options)}
    />
  );
};

CreatableMulti.propTypes = {
  disabled: PropTypes.bool
};

export default CreatableMulti;