import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Input, Modal } from 'semantic-ui-react';
import './EmployeeModal.css';

export class EmployeeModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
  }

  handleChangeDropdown(event, data) {
    this.props.onChangeForm({
      target: {
        name: 'languages',
        value: data.value
      }
    });
  }

  render() {
    const {
      props: {
        showMenu,
        onCloseMenu,
        onChangeForm,
        onSubmitForm,
        headerText,
        employee: { firstName, lastName, dateOfBirth, primaryLanguage, languagesOptions }
      }
    } = this;

    const languageOptions = languagesOptions.map(language => ({
      text: language,
      value: language
    }));

    return (
      <Modal className="employee-modal" open={showMenu} onClose={onCloseMenu}>
        <Modal.Header>{headerText}</Modal.Header>
        <div className="employee-modal-container">
          <form onSubmit={onSubmitForm}>
            <Input
              name="firstName"
              placeholder="First name"
              label="First name"
              defaultValue={firstName}
              onChange={onChangeForm}
              fluid
            />
            <Input
              name="lastName"
              placeholder="Last name"
              label="Last name"
              defaultValue={lastName}
              onChange={onChangeForm}
              fluid
            />
            <Input
              name="dateOfBirth"
              placeholder="Date of birth"
              label="Date of birth"
              defaultValue={dateOfBirth}
              onChange={onChangeForm}
              fluid
            />
            <Input
              name="primaryLanguage"
              placeholder="Primary language"
              label="Primary language"
              defaultValue={primaryLanguage}
              onChange={onChangeForm}
              fluid
            />
            <div className="ui fluid labeled input">
              <div className="ui label label">Languages</div>
              <Dropdown
                className="employee-modal-dropdown-languages"
                placeholder="Languages"
                fluid
                multiple
                selection
                onChange={this.handleChangeDropdown}
                defaultValue={languagesOptions}
                options={languageOptions}
              />
            </div>

            <Button className="employee-modal-apply" type="submit" primary>
              Apply
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}

EmployeeModal.propTypes = {
  showMenu: PropTypes.bool,
  onCloseMenu: PropTypes.func,
  onChangeForm: PropTypes.func,
  onSubmitForm: PropTypes.func,
  headerText: PropTypes.string,
  employee: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    primaryLanguage: PropTypes.string,
    headerText: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    languagesOptions: PropTypes.arrayOf(PropTypes.string)
  })
};

export default EmployeeModal;
