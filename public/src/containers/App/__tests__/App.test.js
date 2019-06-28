import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

function renderComponent(mountFn = shallow) {
  return mountFn(<App />);
}

describe('<App /> Component', () => {
  it(`should contains following controls:
        - 1 <div> with correct text;
        - 1 <header> with correct text;
        - 1 <main> with correct text;`, () => {
    const component = renderComponent();

    expect(component.find('div')).toHaveLength(1);
    expect(component.find('header')).toHaveLength(1);
    expect(component.find('main')).toHaveLength(1);
  });

  it(`should contain expected children`, () => {
    const component = shallow(<App><h1>Header text</h1></App>);

    expect(component.find('h1')).toHaveLength(1);
    expect(component.find('h1').text()).toBe('Header text');
  });
});
