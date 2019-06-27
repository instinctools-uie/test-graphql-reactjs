import React from 'react';
import NotFoundPage from '../NotFoundPage';
import { shallow } from 'enzyme';

function renderComponent(mountFn = shallow) {
  return mountFn(<NotFoundPage />);
}

describe('<NotFoundPage /> Component', () => {
  it(`should contains following controls:
        - 1 <h1> with correct text;`, () => {
    const component = renderComponent();

    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h1').text()).toBe('Page not found');
  });
});
