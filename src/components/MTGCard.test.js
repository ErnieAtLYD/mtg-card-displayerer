import React from 'react';
import { shallow } from 'enzyme';
import MTGCard from './MTGCard';

it('renders without crashing', () => {
  const component = shallow(<MTGCard />);
});
