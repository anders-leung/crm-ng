import { phone, email } from 'src/app/globals';

const table = (user) => {
  const tables: any = {
    tabs: [
      {
        name: 'Clients',
        query: {},
      },
    ],
    columns: [
      { label: 'Client Name', field: 'name', sticky: true },
      { label: 'Phone', field: 'phone', edit: { type: 'input', mask: phone } },
      { label: 'Email', field: 'email', edit: { type: 'input', mask: email } },
    ],
    addForm: {
      form: [
        [
          { label: 'Client Name', field: 'name' },
        ],
        [
          { label: 'Phone', field: 'phone', mask: phone },
          { label: 'Email', field: 'email', mask: email },
        ],
      ],
    },
  };

  return tables;
};

export { table };
