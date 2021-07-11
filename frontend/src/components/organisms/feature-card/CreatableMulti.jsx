import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

import PropTypes from 'prop-types';

const CreatableMulti = ({ disabled }) => (
  <CreatableSelect
    isMulti
    isDisabled={disabled}
    placeholder="Add customers here..."
    options={[]}
  />

);

CreatableMulti.propTypes = {
  disabled: PropTypes.bool
};

export default CreatableMulti;