import React from 'react';
import { shallow } from 'enzyme';
import MenuBar from './MenuBar';

it('renders without crashing', () => {
  const component = shallow(<MenuBar />);
});
