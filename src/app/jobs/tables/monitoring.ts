import { deleteRow, exists, notExists } from 'src/app/globals';

const table = (data) => {
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
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', edit: { type: 'date' }, type: 'date' },
      { label: 'Cab #', field: 'cab' },
      { label: 'By', field: 'by', edit: { type: 'select', options: users } },
      { label: 'Flw Up Mo & Year', field: 'followUp', edit: { type: 'input' } },
      { label: 'Type', field: 'type', fn: (job) => job.type.name },
      { label: 'What To Do', field: 'whatToDo', edit: { type: 'input' } },
      { label: 'Descp/Follow up', field: 'description', edit: { type: 'input' } },
      { label: 'Amt', field: 'amount', edit: { type: 'input' } },
      { label: 'GK To Do', field: 'gkToDo', edit: { type: 'input' } },
      { label: 'Notes', field: 'notes', edit: { type: 'input' } },
      { label: 'GK Done', field: 'gkDone', edit: { type: 'date' }, type: 'date' },
      { label: 'Flw Up By', field: 'followUpBy', edit: { type: 'select', options: users } },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' } },
      { label: 'LK Done', field: 'lkDone', edit: { type: 'date' }, type: 'date' },
    ],
    addForm: {
      form: [
        [
          { label: 'Client', field: 'client', type: 'autocomplete', options: clients.map(client => client.label) }
        ],
        [
          { label: 'Type', field: 'type', type: 'select', options: jobs },
        ],
      ],
      onSubmit: (data) => {
        const clientName = data.client;
        const client = clients.find(client => client.label === clientName);
        data.client = client.value;
      },
    },
  };

  if (user.role === 'Administrator') {    
    tables.columns.push(deleteRow);
    tables.tabs.forEach((tab) => {
      if (tab.columns) {
        tab.columns.push(deleteRow);
      }
    });
  }
  
  return tables;
}

export { table };
