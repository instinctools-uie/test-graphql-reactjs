import React from 'react';
import { Table, Dropdown, Loader, Icon, Modal, Input, Button } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';

import { EmployeeModal } from '../../components';
import { getEmployees, updateEmployee } from '../../services/gqlRequests';

import './Employees.css';

export class Employees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditMenu: false,
      employee: {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        primaryLanguage: '',
        languages: [],
        languagesOptions: []
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleCloseMenu() {
    this.setState({
      showEditMenu: null
    });
  }

  handleClickEditIcon(employee) {
    this.setState({
      showEditMenu: true,
      employee: {
        ...this.state.employee,
        ...employee,
        languagesOptions: employee.languages
      }
    });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      employee: {
        ...this.state.employee,
        [name]: value
      }
    });
  }

  handleSubmitForm(event) {
    const { employee } = this.state;
    event.preventDefault();
    console.log('employee', employee);
  }

  render() {
    const { employee, showEditMenu } = this.state;

    return (
      <section className="employees-page">
        <EmployeeModal
          showMenu={showEditMenu}
          headerText="Edit employee"
          employee={employee}
          onChangeForm={this.handleChange}
          onSubmitForm={this.handleSubmitForm}
          onCloseMenu={this.handleCloseMenu}
        />
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
