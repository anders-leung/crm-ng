import { exists, notExists } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const review = jobs.find(job => job.label === 'Review').value;

  const tab = {
    tabs: [
      {
        name: 'Review',
        query: {
          type: review,
          done: notExists,
        },
      },
      {
        name: 'Review Done',
        query: {
          type: review,
          done: exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Meeting Date', field: 'meetingDate', edit: { type: 'date' }, type: 'date' },
      { label: 'Appt Date', field: 'appointmentDate', edit: { type: 'date' }, type: 'date' },
      { label: 'Excel UD', field: 'review.excel', edit: { type: 'date' }, type: 'date' },
      { label: 'Descp', field: 'description', edit: { type: 'input' } },
      { label: 'AA Done', field: 'review.aaDone', edit: { type: 'date' }, type: 'date' },
      { label: 'Minute', field: 'review.minute', edit: { type: 'date' }, type: 'date' },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' }, color: 'red' },
      { label: 'Swt Si', field: 'review.swt.signed', edit: { type: 'date' }, type: 'date' },
      { label: 'Trade Note', field: 'review.tradeNote', edit: { type: 'input' } },
      { label: 'To LK', field: 'review.toLk', edit: { type: 'date' }, type: 'date' },
      { label: 'Swt Done', field: 'review.swt.done', edit: { type: 'date' }, type: 'date' },
      { label: 'New AA Done', field: 'review.newAADone', edit: { type: 'date' }, type: 'date' },
      { label: 'Review Done', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: review },
    },
  };

  return tab;
}
