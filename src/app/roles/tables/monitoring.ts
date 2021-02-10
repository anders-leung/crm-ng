import { deleteRow, exists, notExists } from 'src/app/globals';

export default (data) => {
  const { user, users, clients, jobs } = data;

  const tables: any = {
    tabs: [
      {
        name: 'Jobs',
        query: {
          done: notExists,
          private: { $ne: true },
        },
      },
      {
        name: 'Done',
        private: { $ne: true },
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
      onSubmit: (data) => {
        const access = data.access.split(',');
        data.access = access.map(section => section.trim());
      },
    },
  };
  
  return tables;
};
