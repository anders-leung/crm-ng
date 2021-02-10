export default {
  tabs: [
    {
      name: 'Roles',
      query: {},
    },
  ],
  columns: [
    { label: 'Name', field: 'name', sticky: true },
    { label: 'Access', field: 'access' },
  ],
  addForm: {
    form: [
      [
        { label: 'Name', field: 'name' }
      ],
      [
        { label: 'Access', field: 'access' },
      ],
    ],
  },
};
