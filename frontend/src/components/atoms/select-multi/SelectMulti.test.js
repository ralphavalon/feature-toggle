import React from 'react';
import { shallow } from 'enzyme';

import SelectMulti from './SelectMulti';

afterEach(() => {
  jest.clearAllMocks();
});

const selectMultiRequiredProps = {
  name: 'name'
};

let selectMultiOptionalProps = {
  disabled: true,
  options: ['123'],
  placeholder: 'placeholder',
  value: ['123']
};

describe('SelectMulti', () => {
  it('renders correctly with required props', () => {
    const wrapper = shallow(<SelectMulti {...selectMultiRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders correctly with required props and optional props', () => {
    const wrapper = shallow(<SelectMulti {...{...selectMultiRequiredProps, ...selectMultiOptionalProps}} />);
    expect(wrapper).toMatchSnapshot();
  });
})

