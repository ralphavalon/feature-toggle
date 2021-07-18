import React from 'react';
import { shallow } from 'enzyme';

import * as Customer from '../../../utils/customer';
import FeatureCard from './FeatureCard';

jest.mock('../../../utils/customer');

const mockGetCustomerIds = value => {
  Customer.getCustomerIds.mockImplementation(() => value);
}

beforeEach(() => {
  mockGetCustomerIds([]);
});

afterEach(() => {
  jest.clearAllMocks();
});

const featureCardRequiredProps = {
  onSubmit: jest.fn(),
  onRemove: jest.fn(),
  invalid: {}
};

let featureCardOptionalProps = {
  active: true,
  customerIds: ['123', '321'],
  description: 'description',
  displayName: 'displayName',
  expiresOn: '2021-01-30T11:33:44',
  id: 'id',
  inverted: true,
  isNew: false,
  onCancel: jest.fn(),
  technicalName: 'technicalName',
  invalid: {
    technicalName: 'Error',
    customerIds: 'Other Error',
  }
};

describe('FeatureCard', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FeatureCard {...featureCardRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders without disabled because is a new feature', () => {
    const wrapper = shallow(<FeatureCard {...{...featureCardRequiredProps, isNew: true, id: 'id' }}  />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with optional props', () => {
    const wrapper = shallow(<FeatureCard {...{...featureCardRequiredProps, ...featureCardOptionalProps }}  />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should call onCancel after clicking on Cancel', () => {
    const wrapper = shallow(<FeatureCard {...{...featureCardRequiredProps, ...featureCardOptionalProps, isNew: true }}  />);
    expect(featureCardOptionalProps.onCancel).toHaveBeenCalledTimes(0);
    wrapper.find('Button').at(1).simulate('click');
    expect(featureCardOptionalProps.onCancel).toHaveBeenCalledTimes(1);
  });
})

