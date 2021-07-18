import React from 'react';
import { shallow } from 'enzyme';

import { StoreContext } from '../../../utils/store';

import ErrorModal from './ErrorModal';

describe('ErrorModal', () => {
  it('renders correctly', () => {
    let wrapper = shallow(
      <StoreContext.Provider value={{
        error: [false, jest.fn()]
      }}>
        <ErrorModal />
      </StoreContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();

    wrapper = shallow(
      <StoreContext.Provider value={{
        error: [true, jest.fn()]
      }}>
        <ErrorModal />
      </StoreContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
})

