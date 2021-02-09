import { yesNo, exists, notExists } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const purchase = jobs.find(job => job.label === 'Purchase').value;

  const table = {
    tabs: [
      {
        name: 'Purchase',
        query: {
          type: purchase,
          done: notExists,
        },
      },
      {
        name: 'Purchase Done',
        query: {
          type: purchase,
          done: exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', edit: { type: 'date' }, type: 'date' },
      { label: 'Descp', field: 'description', edit: { type: 'input' } },
      { label: 'Em Client', field: 'purchase.emailClient', edit: { type: 'date' }, type: 'date' },
      { label: 'Fund Fact Sent', field: 'purchase.fundFs', edit: { type: 'select', options: yesNo, none: false } },
      { label: 'Client Si', field: 'purchase.clientSigned', edit: { type: 'date' }, type: 'date' },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' } },
      { label: 'Trade Note', field: 'purchase.tradeNote', edit: { type: 'date' }, type: 'date' },
      { label: 'To LK', field: 'purchase.toLk', edit: { type: 'date' }, type: 'date' },
      { label: 'Pur/Swt Done', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: purchase },
    },
  };

  return table;
}
