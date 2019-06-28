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

    expect(component.find('Header')).toHaveLength(1);
    expect(component.find('Header').props()).toEqual({ as: 'h1', children: 'Page not found' });
  });
});
