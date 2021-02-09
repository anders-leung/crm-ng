import { get } from 'lodash';
import { exists, notExists, yesNo } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const hub = jobs.find(job => job.label === 'Hub Flex Save').value;

  const tab = {
    tabs: [
      {
        name: 'Hub',
        query: {
          type: hub,
          done: notExists,
        },
      },
      {
        name: 'Done',
        query: {
          type: hub,
          done: exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', type: 'date' },
      { label: 'New Co Set Up', field: 'hub.newCompany', edit: { type: 'date' }, type: 'date' },
      { label: 'Claim Rec', field: 'hub.claimReceived', edit: { type: 'date' }, type: 'date' },
      { label: 'Claim Done', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: hub },
    },
  };

  return tab;
}
