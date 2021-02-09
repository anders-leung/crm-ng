import { yesNo } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const insurance = jobs.find(job => job.label === 'Insurance').value;

  const table = {
    tabs: [
      {
        name: 'Insurance',
        query: { type: insurance },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Date', field: 'created', edit: { type: 'date' }, type: 'date' },
      { label: 'Meeting Date', field: 'meetingDate', edit: { type: 'date' }, type: 'date' },
      { label: 'App\'n Sign', field: 'insurance.appointment.sign', edit: { type: 'date' }, type: 'date' },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' }, color: 'red' },
      { label: 'Medical Ck Setup', field: 'insurance.medical.check', edit: { type: 'date' }, type: 'date' },
      { label: 'Med Done', field: 'insurance.medical.done', edit: { type: 'date' }, type: 'date' },
      { label: 'APS Rec\'d', field: 'insurance.apsReceived', edit: { type: 'date' }, type: 'date' },
      { label: 'App\'n Approved', field: 'insurance.appointment.approved', edit: { type: 'date' }, type: 'date' },
      { label: 'Policy Rec\'d', field: 'insurance.policy.received', edit: { type: 'date' }, type: 'date' },
      { label: 'Policy Del', field: 'insurance.policy.delete', edit: { type: 'date' }, type: 'date' },
      { label: 'Ins Close', field: 'insurance.insurance.close', edit: { type: 'select', options: yesNo } },
      { label: 'Ins Done', field: 'done', edit: { type: 'date' }, type: 'date' },
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
      default: { type: insurance },
    },
  };

  return table;
}
