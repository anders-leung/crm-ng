import { exists, notExists } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const kyc = jobs.find(job => job.label === 'KYC').value;

  const table = {
    tabs: [
      {
        name: 'KYC',
        query: {
          type: kyc,
          'kyc.done': notExists,
        },
      },
      {
        name: 'KYC Done',
        query: {
          type: kyc,
          'kyc.done': exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', edit: { type: 'date' }, type: 'date' },
      { label: 'Info Send to Client', field: 'kyc.infoSent', edit: { type: 'date' }, type: 'date' },
      { label: 'Client Rpy', field: 'kyc.clientReply', edit: { type: 'date' }, type: 'date' },
      { label: 'O/S', field: 'outstanding', edit: { type: 'input' } },
      { label: 'LK Done for GK Si', field: 'finish', edit: { type: 'date' }, type: 'date' },
      { label: 'GK Si', field: 'kyc.gkSigned', edit: { type: 'date' }, type: 'date' },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' }, color: 'red' },
      { label: 'BM O/S', field: 'kyc.bmOutstanding', edit: { type: 'date' }, type: 'date' },
      { label: 'BM Si & Done', field: 'kyc.bmSigned', edit: { type: 'date' }, type: 'date' },
      { label: 'KYC Appr', field: 'kyc.approved', edit: { type: 'date' }, type: 'date' },
      { label: 'KYC Done', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: kyc },
    },
  };

  return table;
}
