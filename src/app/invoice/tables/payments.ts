const table = (options) => {
  const { pytReceived } = options;
  return {
    tabs: [
      {
        name: 'Payments',
        query: {
          pytReceived: { $nin: [undefined, null] },
          pytDate: { $nin: [undefined, null] },
        },
      },
    ],
    columns: [
      { label: 'Issue Date', field: 'issueDate', edit: { type: 'date' }, type: 'date' },
      { label: 'PYT Date', field: 'pytDate', type: 'date', edit: { type: 'date' } },
      { label: '#', field: 'number', fn: (invoice) => invoice.number },
      { label: 'Client', field: 'client',
        fn: (invoice) => {
          const { client, oneTimeClient } = invoice;
          if (client) return client.name;
          else if (oneTimeClient) return oneTimeClient.name;
          else return '';
        },
      },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' }, color: 'red' },
      { label: 'ADV', field: 'ADV', sum: true, fn: (invoice) => invoice.pytReceived === 'ADV' ? invoice.total : '', type: 'currency' },
      { label: 'INV', field: 'INV', sum: true, fn: (invoice) => invoice.pytReceived === 'INV' ? invoice.total : '', type: 'currency' },
      { label: 'CA', field: 'CA', sum: true, fn: (invoice) => invoice.pytReceived === 'CA' ? invoice.total : '', type: 'currency' },
      { label: 'CHQ', field: 'CHQ', sum: true, fn: (invoice) => invoice.pytReceived === 'CHQ' ? invoice.total : '', type: 'currency' },
      { label: 'DD', field: 'DD', sum: true, fn: (invoice) => invoice.pytReceived === 'DD' ? invoice.total : '', type: 'currency' },
      { label: 'ET', field: 'ET', sum: true, fn: (invoice) => invoice.pytReceived === 'ET' ? invoice.total : '', type: 'currency' },
      { label: 'Total Received', field: 'total', type: 'currency', sum: true },
      { label: 'Company', field: 'company', visible: false },
      { label: 'PYT Type', field: 'pytReceived', visible: false },
    ],
  };
}

export { table };
