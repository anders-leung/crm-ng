import { deleteRow, yesNo } from 'src/app/globals';

const roleOptions = ['Employee', 'Administrator'];

const table = {
  tabs: [
    {
      name: 'Users List',
      query: {}
    },
  ],
  columns: [
    { label: 'Name', field: 'name', edit: { type: 'input' } },
    { label: 'Email', field: 'email', edit: { type: 'input' } },
    { label: 'Role', field: 'role', edit: { type: 'select', options: roleOptions, none: false } },
    { label: 'Initials', field: 'initials', edit: { type: 'input' } },
    { label: 'Email Password', field: 'emailPassword', edit: { type: 'input' } },
    { label: 'Private', field: 'private', edit: { type: 'select', options: yesNo } },
    { ...deleteRow },
  ],
  addForm: {
    form: [
      [
        { label: 'Email', field: 'email' },
        { label: 'Password', field: 'password', },
      ],
      [
        { label: 'Name', field: 'name', },
        { label: 'Initials', field: 'initials' },
      ],
      [
        { label: 'Email Password', field: 'emailPassword' },
        { label: 'Private', field: 'private', type: 'checkbox' },
      ],
      [
        { label: 'Role', field: 'role', type: 'select', options: ['Employee', 'Administrator'], none: false },
      ],
    ],
    default: {
      role: 'Employee',
    },
  },
}

export { table };
