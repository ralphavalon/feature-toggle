import React from 'react';
import { shallow } from 'enzyme';

import FormSelectField from './FormSelectField';

afterEach(() => {
  jest.clearAllMocks();
});

const formSelectFieldRequiredProps = {
  label: 'Label',
  name: 'field-name'
};

let formSelectFieldOptionalProps = {
  className: 'className',
  disabled: true,
  inputProps: { rows: 3 },
  inputType: 'textarea',
  value: ['value'],
  options: ['option']
};

describe('FormSelectField', () => {
  it('renders correctly with required props', () => {
    const wrapper = shallow(<FormSelectField {...formSelectFieldRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders correctly with required props and optional props', () => {
    const wrapper = shallow(<FormSelectField {...{...formSelectFieldRequiredProps, ...formSelectFieldOptionalProps}} />);
    expect(wrapper).toMatchSnapshot();
  });
})

