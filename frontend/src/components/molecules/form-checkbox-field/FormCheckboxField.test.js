import React from 'react';
import { shallow } from 'enzyme';

import FormCheckboxField from './FormCheckboxField';

afterEach(() => {
  jest.clearAllMocks();
});

const formCheckboxFieldRequiredProps = {
  label: 'Label',
  name: 'field-name'
};

let formCheckboxFieldOptionalProps = {
  className: 'className',
  disabled: true,
  value: true,
};

describe('FormCheckboxField', () => {
  it('renders correctly with required props', () => {
    const wrapper = shallow(<FormCheckboxField {...formCheckboxFieldRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders correctly with required props and optional props', () => {
    const wrapper = shallow(<FormCheckboxField {...{...formCheckboxFieldRequiredProps, ...formCheckboxFieldOptionalProps}} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should change state when onChange', () => {
    const wrapper = shallow(<FormCheckboxField {...formCheckboxFieldRequiredProps} />);
    wrapper.find('FormCheck').simulate('change', { target: { value: true }});
    expect(wrapper.find('FormCheck').prop('value')).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
})

