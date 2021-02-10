export default {
  tabs: [
    {
      name: 'Roles',
      query: {},
    },
  ],
  columns: [
    { label: 'Name', field: 'name', edit: { type: 'input' }, sticky: true },
    { label: 'Access', field: 'access', edit: { type: 'input' } },
  ],
  addForm: {
    form: [
      [
        { label: 'Name', field: 'name' }
      ],
      [
        { label: 'Access (comma separated list)', field: 'access' },
      ],
    ],
  },
};
