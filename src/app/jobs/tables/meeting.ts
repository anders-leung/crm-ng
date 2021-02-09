import { deleteRow } from 'src/app/globals';

const table = (options) => {
  const { user, clients, jobs } = options;
  const meeting = jobs.find(job => job.label === 'Meeting');
  const tables: any = {
    tabs: [
      {
        name: 'Names',
        query: {
          type: meeting.value,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Meeting Cycle', field: 'meeting.cycle', edit: { type: 'date' }, type: 'date' },
      { label: 'Month', field: 'meeting.month', edit: { type: 'input' } },
      { label: 'Em/Call', field: 'meeting.email', edit: { type: 'date' }, type: 'date' },
      { label: 'Meet Date', field: 'meeting.date', edit: { type: 'date' }, type: 'date' },
      { label: 'Done', field: 'meeting.done', edit: { type: 'date' }, type: 'date' },
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
      default: {
        type: meeting.value,
      },
    },
  };

  if (user.role === 'Administrator') {    
    tables.columns.push(deleteRow);
  }
  
  return tables;
}

export { table };
