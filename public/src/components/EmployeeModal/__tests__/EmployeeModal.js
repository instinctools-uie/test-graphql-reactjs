import React from 'react';
import EmployeeModal from '../EmployeeModal';
import { shallow } from 'enzyme';
import { Button, Dropdown, Input, Modal, Loader } from 'semantic-ui-react';

const mockEmployee = {
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  primaryLanguage: '',
  languages: ['English', 'German'],
  languagesOptions: ['English', 'German']
};

function renderComponent(mountFn = shallow) {
  return mountFn(<EmployeeModal employee={mockEmployee} />);
}

describe('<EmployeeModal /> Component', () => {
  it(`should contains following controls:
        - 1 <Button> with correct text;
        - 1 <Dropdown> with correct text;
        - 1 <Input> with correct text;
        - 1 <Modal> with correct text;
        - 1 <Loader> with correct text;`, () => {
    const component = renderComponent();

    expect(component.find('Button')).toHaveLength(1);
    expect(component.find('Dropdown')).toHaveLength(1);
    expect(component.find('Input')).toHaveLength(4);
    expect(component.find('Modal')).toHaveLength(1);
    expect(component.find('Loader')).toHaveLength(1);
  });
});
