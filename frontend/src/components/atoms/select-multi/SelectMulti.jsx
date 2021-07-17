import React from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

const getValueAs = (value, type) => {
  let response = [];

  if (value.length > 0) {
    for (let i in value) {
      if(type === 'object') {
        response.push({ value: value[i], label: value[i] });
      } else {
        response.push(value[i].value);
      }
    }
  }
  return response;
};

const showValue = value => {
  if (!value) return null;
  return value.length > 0 && typeof value[0] === 'string'
    ? getValueAs(value, 'object') : value;
};

const toPlanList = value => {
  if (!value) return null;
  return value.length > 0 && typeof value[0].value === 'string'
    ? getValueAs(value, 'string') : value;
};

const SelectMulti = ({
  name, value, options, onChange, placeholder, disabled
}) => {

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

SelectMulti.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default SelectMulti;