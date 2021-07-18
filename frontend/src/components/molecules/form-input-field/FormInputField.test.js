import React from 'react';
import { shallow } from 'enzyme';

import FormInputField from './FormInputField';

afterEach(() => {
  jest.clearAllMocks();
});

const formInputFieldRequiredProps = {
  label: 'Label',
  name: 'field-name'
};

let formInputFieldOptionalProps = {
  className: 'className',
  disabled: true,
  inputProps: { rows: 3 },
  inputType: 'textarea',
  value: 'value',
  invalidMessage: 'invalidMessage'
};

describe('FormInputField', () => {
  it('renders correctly with required props', () => {
    const wrapper = shallow(<FormInputField {...formInputFieldRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders correctly with required props and optional props', () => {
    const wrapper = shallow(<FormInputField {...{...formInputFieldRequiredProps, ...formInputFieldOptionalProps}} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should change state when onChange', () => {
    const wrapper = shallow(<FormInputField {...formInputFieldRequiredProps} />);
    wrapper.find('FormControl').simulate('change', { target: { value: 'myValue' }});
    expect(wrapper.find('FormControl').prop('value')).toEqual('myValue');
    expect(wrapper).toMatchSnapshot();
  });
})

