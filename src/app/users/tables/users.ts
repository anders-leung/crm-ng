import { yesNo } from 'src/app/globals';

export default (options) => {
  const { roles } = options;
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
      { label: 'Role', field: 'role', fn: (user) => user.role.name, edit: { type: 'select', options: roles, none: false } },
      { label: 'Initials', field: 'initials', edit: { type: 'input' } },
      { label: 'Private', field: 'private', edit: { type: 'select', options: yesNo } },
    ],
    addForm: {
      form: [
        [
          { label: 'Email', field: 'email' },
          { label: 'Password', field: 'password', inputType: 'password' },
        ],
        [
          { label: 'Name', field: 'name', },
          { label: 'Initials', field: 'initials' },
        ],
        [
          { label: 'Email Password', field: 'emailPassword', inputType: 'password' },
          { label: 'Private', field: 'private', type: 'checkbox' },
        ],
        [
          { label: 'Role', field: 'role', type: 'select', options: roles, none: false },
        ],
      ],
    },
  };

  return table;
};
