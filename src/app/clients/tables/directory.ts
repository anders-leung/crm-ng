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
      { label: 'Client Name', field: 'name', edit: { type: 'input' }, sticky: true },
      { label: 'Phone', field: 'phone', edit: { type: 'input', mask: phone } },
      { label: 'Email', field: 'email', edit: { type: 'input', mask: email } },
      { label: 'Last Notified', field: 'notified', edit: { type: 'date' }, type: 'date' },
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
