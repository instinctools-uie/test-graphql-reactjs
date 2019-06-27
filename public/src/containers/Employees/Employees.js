import React from 'react';
import { Table, Dropdown, Loader, Icon, Modal, Input, Button } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { getEmployees } from '../../services/gqlRequests';

import './Employees.css';

export class Employees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditMenu: false,
      employeeEditValue: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        primaryLanguage: '',
        languages: []
      }
    };

    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this);
  }

  handleCloseMenu() {
    this.setState({
      showEditMenu: null
    });
  }

  handleClickEditIcon(employee) {
    this.setState({
      showEditMenu: true,
      employeeEditValue: {
        ...this.state.employeeEditValue,
        ...employee
      }
    });
  }

  render() {
    const {
      employeeEditValue: { firstName, lastName, dateOfBirth, primaryLanguage, languages },
      showEditMenu
    } = this.state;
    const languageOptions = languages.map(language => ({
      key: language,
      text: language,
      value: language
    }));

    return (
      <section className="employees-page">
        <Modal className="employees-page-modal" open={showEditMenu} onClose={this.handleCloseMenu}>
          <Modal.Header>Edit employee</Modal.Header>
          <div className="employees-page-modal-container">
            <Input placeholder="First name" label="First name" defaultValue={firstName} fluid />
            <Input placeholder="Last name" label="Last name" defaultValue={lastName} fluid />
            <Input placeholder="Date of birth" label="Date of birth" defaultValue={dateOfBirth} fluid />
            <Input placeholder="Primary language" label="Primary language" defaultValue={primaryLanguage} fluid />
            <Dropdown
              className="employees-page-dropdown-languages"
              placeholder="Languages"
              fluid
              multiple
              selection
              defaultValue={languages}
              options={languageOptions}
            />
            <Button className="employees-page-modal-apply" primary>
              Apply
            </Button>
          </div>
        </Modal>
        <Query query={getEmployees}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active />;
            if (error) return <p>Error :(</p>;

            return (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>First name</Table.HeaderCell>
                    <Table.HeaderCell>Last name</Table.HeaderCell>
                    <Table.HeaderCell>Date of birth</Table.HeaderCell>
                    <Table.HeaderCell>Primary language</Table.HeaderCell>
                    <Table.HeaderCell>Languages</Table.HeaderCell>
                    <Table.HeaderCell>Settings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.employees.map(employee => {
                    const languageOptions = employee.languages.map(language => ({
                      text: language,
                      value: language
                    }));

                    return (
                      <Table.Row key={employee.id}>
                        <Table.Cell>{employee.firstName}</Table.Cell>
                        <Table.Cell>{employee.lastName}</Table.Cell>
                        <Table.Cell>{employee.dateOfBirth}</Table.Cell>
                        <Table.Cell>{employee.primaryLanguage}</Table.Cell>
                        <Table.Cell>
                          <Dropdown
                            className="employees-page-dropdown-languages"
                            placeholder="Languages"
                            fluid
                            multiple
                            selection
                            disabled
                            defaultValue={employee.languages}
                            options={languageOptions}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Icon onClick={() => this.handleClickEditIcon(employee)} name="edit"></Icon>
                          <Icon name="remove"></Icon>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            );
          }}
        </Query>
      </section>
    );
  }
}

export default Employees;
