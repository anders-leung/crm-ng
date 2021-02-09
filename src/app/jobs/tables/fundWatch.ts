import { get } from 'lodash';
import { exists, notExists, yesNo } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const fundWatch = jobs.find(job => job.label === 'Fund Watch').value;

  const tab = {
    tabs: [
      {
        name: 'Fund Watch',
        query: {
          type: fundWatch,
          done: notExists,
        },
      },
      {
        name: 'Done',
        query: {
          type: fundWatch,
          done: exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', type: 'date' },
      { label: 'MF Co', field: 'fundWatch.mfCompany', edit: { type: 'input' } },
      { label: 'Fund Name', field: 'fundWatch.fundName', edit: { type: 'input' } },
      { label: 'Code LL', field: 'fundWatch.codeLL', edit: { type: 'input' } },
      { label: 'Code FE', field: 'fundWatch.codeFE', edit: { type: 'input' } },
      { label: 'Category', field: 'fundWatch.category', edit: { type: 'input' } },
      { label: 'FF Date', field: 'fundWatch.ffDate', edit: { type: 'date' } },
      { label: 'Risk', field: 'fundWatch.risk', edit: { type: 'input' } },
      { label: 'Purchase Date', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: fundWatch },
    },
  };

  return tab;
}
