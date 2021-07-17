import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

describe('Home', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders feature card when clicking on Add new feature', () => {
    const wrapper = shallow(<Home />);
    wrapper.find('Button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders without feature card when clicking on Add new feature and then on Submit', () => {
    const wrapper = shallow(<Home />);
    wrapper.find('Button').simulate('click');
    wrapper.find('FeatureCardContainer').prop('onSubmit')();
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders without feature card when clicking on Add new feature and then on Cancel', () => {
    const wrapper = shallow(<Home />);
    wrapper.find('Button').simulate('click');
    wrapper.find('FeatureCardContainer').prop('onCancel')();
    expect(wrapper).toMatchSnapshot();
  });
})

