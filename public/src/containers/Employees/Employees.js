import React from 'react';
import { Query, graphql, compose } from 'react-apollo';
import { Confirm, Table, Dropdown, Loader, Icon, Button } from 'semantic-ui-react';

import { EmployeeModal } from '../../components';
import { getEmployees, createEmployee, updateEmployee, removeEmployee } from '../../services/gqlRequests';

import './Employees.css';

export class Employees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreateEmployee: false,
      showModal: false,
      showConfirmModal: false,
      loading: true,
      error: null,
      employee: {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        primaryLanguage: '',
        languages: ['English', 'German'],
        languagesOptions: ['English', 'German']
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClickCreateButton = this.onClickCreateButton.bind(this);
    this.handleConfirmModal = this.handleConfirmModal.bind(this);
    this.handleCreateEmployee = this.handleCreateEmployee.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseConfirmModal = this.handleCloseConfirmModal.bind(this);
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this);
    this.handleClickRemoveIcon = this.handleClickRemoveIcon.bind(this);
    this.handleEditEmployee = this.handleEditEmployee.bind(this);
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
      isCreateEmployee: false,
      error: null
    });
  }

  handleCloseConfirmModal() {
    this.setState({
      showConfirmModal: false,
      error: null
    });
  }

  onClickCreateButton() {
    this.setState({
      showModal: true,
      isCreateEmployee: true
    });
  }

  handleClickEditIcon(employee) {
    this.setState({
      showModal: true,
      employee: {
        ...this.state.employee,
        ...employee,
        languagesOptions: employee.languages
      }
    });
  }

  handleClickRemoveIcon(employee) {
    this.setState({
      showConfirmModal: true,
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

  handleConfirmModal() {
    const {
      employee: { id }
    } = this.state;

    this.setState({
      loading: true
    });
    this.props
      .removeEmployee({
        variables: {
          id
        },
        update: cache => {
          const { employees } = cache.readQuery({ query: getEmployees });
          cache.writeQuery({
            query: getEmployees,
            data: { employees: employees.filter(employee => employee.id !== id) }
          });
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          showConfirmModal: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Some error'
        });
      });
  }

  handleCreateEmployee(event) {
    const {
      employee: { firstName, lastName, dateOfBirth, primaryLanguage, languages }
    } = this.state;
    event.preventDefault();

    this.setState({
      loading: true
    });

    this.props
      .createEmployee({
        variables: {
          firstName,
          lastName,
          dateOfBirth,
          primaryLanguage,
          languages
        },
        update: (cache, { data: { createEmployee } }) => {
          const { employees } = cache.readQuery({ query: getEmployees });
          cache.writeQuery({
            query: getEmployees,
            data: { employees: employees.concat([createEmployee]) }
          });
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          showModal: false,
          isCreateEmployee: false,
          employee: {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            primaryLanguage: '',
            languages: ['English', 'German'],
            languagesOptions: ['English', 'German']
          }
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Some error'
        });
      });
  }

  handleEditEmployee(event) {
    const {
      employee: { id, firstName, lastName, dateOfBirth, primaryLanguage, languages }
    } = this.state;
    event.preventDefault();

    this.setState({
      loading: true
    });

    this.props
      .updateEmployee({
        variables: {
          id,
          firstName,
          lastName,
          dateOfBirth,
          primaryLanguage,
          languages
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          showModal: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Some error'
        });
      });
  }

  render() {
    const { employee, isCreateEmployee, showModal, showConfirmModal, loading, error } = this.state;

    return (
      <div className="employees-page">
        <Button className="employees-page-create-button" onClick={this.onClickCreateButton}>
          Create
        </Button>
        <EmployeeModal
          showModal={showModal}
          headerText="Edit employee"
          employee={employee}
          loading={loading}
          error={error}
          onChangeForm={this.handleChange}
          onSubmitForm={isCreateEmployee ? this.handleCreateEmployee : this.handleEditEmployee}
          onCloseModal={this.handleCloseModal}
        />
        <Confirm
          open={showConfirmModal}
          header={'Are you sure?'}
          content={error}
          onCancel={this.handleCloseConfirmModal}
          onConfirm={this.handleConfirmModal}
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
                          <Icon onClick={() => this.handleClickRemoveIcon(employee)} name="remove"></Icon>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default compose(
  graphql(updateEmployee, { name: 'updateEmployee' }),
  graphql(removeEmployee, { name: 'removeEmployee' }),
  graphql(createEmployee, { name: 'createEmployee' })
)(Employees);
