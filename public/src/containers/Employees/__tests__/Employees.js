import React from 'react';
import Employees from '../Employees';
import { shallow } from 'enzyme';

function renderComponent(mountFn = shallow) {
  return mountFn(<Employees />);
}

describe('<Employees /> Component', () => {
  it(`should contains following controls:
        - 1 <section> with correct text;`, () => {
    const component = renderComponent();

    expect(component.find('section')).toHaveLength(1);
    expect(component.find('section').text()).toBe('Trial task');
  });
});
