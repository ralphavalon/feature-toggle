import React from 'react';
import { shallow } from 'enzyme';

import EditAndRemoveHeader from './EditAndRemoveHeader';

afterEach(() => {
  jest.clearAllMocks();
});

const editAndRemoveHeaderRequiredProps = {
  onEdit: jest.fn(),
  onRemove: jest.fn(),
  headerText: 'headerText',
  size: 2
};

let editAndRemoveHeaderOptionalProps = {
  className: 'className'
};

describe('EditAndRemoveHeader', () => {
  it('renders correctly with required props', () => {
    const wrapper = shallow(<EditAndRemoveHeader {...editAndRemoveHeaderRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders correctly with required props and optional props', () => {
    const wrapper = shallow(<EditAndRemoveHeader {...{...editAndRemoveHeaderRequiredProps, ...editAndRemoveHeaderOptionalProps}} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should call onEdit when clicked', () => {
    const wrapper = shallow(<EditAndRemoveHeader {...editAndRemoveHeaderRequiredProps} />);
    expect(editAndRemoveHeaderRequiredProps.onEdit).toHaveBeenCalledTimes(0);
    wrapper.find('a').at(0).simulate('click');
    expect(editAndRemoveHeaderRequiredProps.onEdit).toHaveBeenCalledTimes(1);
  });
})

