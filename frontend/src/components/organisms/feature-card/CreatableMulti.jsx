import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';

const showValue = value => {
  if(!value) return null;
  let response = [];

  if(value.length > 0 && typeof value[0] === 'string') {
    for(let i in value) {
      response.push({ value: value[i], label: value[i] });
    }
  }
  return response;
};

const CreatableMulti = ({ name, value, disabled }) => (
  <CreatableSelect
    isMulti
    name={name}
    defaultValue={showValue(value)}
    isDisabled={disabled}
    placeholder="Add customers here..."
    options={[]}
  />

);

CreatableMulti.propTypes = {
  disabled: PropTypes.bool
};

export default CreatableMulti;