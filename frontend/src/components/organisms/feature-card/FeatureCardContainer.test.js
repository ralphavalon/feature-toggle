import React from 'react';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
import serialize from 'form-serialize';
import { act } from 'react-dom/test-utils';

import * as Customer from '../../../utils/customer';
import FeatureCardContainer from './FeatureCardContainer';
import { StoreContext } from '../../../utils/store';

jest.mock('axios');
jest.mock('form-serialize');
jest.mock('../../../utils/customer');

const mockGetCustomerIds = value => {
  Customer.getCustomerIds.mockImplementation(() => value);
}
let event = {
  preventDefault: jest.fn(),
  target: {
    displayName: 'displayName',
    technicalName: 'technicalName',
    active: true,
    inverted: true,
    customerIds: ['123', '321'],
    expiresOn: '2021-05-05T 11:22:33'
  }
};

const expectedRequest = {
  ...event.target,
  expiresOn: '2021-05-05T11:22:33',
  id: 'id'
}

beforeEach(() => {
  mockGetCustomerIds([]);
  event = {
    preventDefault: jest.fn(),
    target: {
      displayName: 'displayName',
      technicalName: 'technicalName',
      active: true,
      inverted: true,
      customerIds: ['123', '321'],
      expiresOn: '2021-05-05T 11:22:33'
    }
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const featureCardContainerOptionalProps = {
  onSubmit: jest.fn(),
  id: 'id'
};


const runInAct = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper();
  });
};

describe('FeatureCardContainer', () => {
  it('renders correctly', () => {
    let wrapper = shallow(
      <StoreContext.Provider value={{
        features: [[], jest.fn()]
      }}>
        <FeatureCardContainer {...featureCardContainerOptionalProps} />
      </StoreContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();

    wrapper = shallow(
      <StoreContext.Provider value={{
        features: [[], jest.fn()]
      }}>
        <FeatureCardContainer {...{...featureCardContainerOptionalProps, id: null }} />
      </StoreContext.Provider>
    );
  });

  test.each([
    {
      props: {...featureCardContainerOptionalProps, id: null }, 
      expectedRequest: { 
        ...expectedRequest,
        id: undefined
      },
      serializeMock: event.target
    },
    {
      props: featureCardContainerOptionalProps, 
      expectedRequest,
      serializeMock: {...event.target, id: featureCardContainerOptionalProps.id }
    },
  ])(`should create/update feature when onSubmit`, async ({ props, expectedRequest, serializeMock }) => {
    axios.put.mockResolvedValue({ data: { id: featureCardContainerOptionalProps.id } });
    serialize.mockImplementation(() => serializeMock);

    const wrapper = mount(
      <StoreContext.Provider value={{
        features: [[], jest.fn()]
      }}>
        <FeatureCardContainer {...props} />
      </StoreContext.Provider>
    );

    await runInAct(() => wrapper.find('FeatureCard').prop('onSubmit')(event));

    expect(wrapper.find('FeatureCardContainer').prop('onSubmit')).toEqual(featureCardContainerOptionalProps.onSubmit);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(serialize).toHaveBeenCalledTimes(1);
    expect(featureCardContainerOptionalProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(expect.anything(), expectedRequest);
  });
})

