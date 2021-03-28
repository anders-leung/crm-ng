export default (options, user) => {
  const { pytReceived, users } = options;
  const tables = {
    tabs: [
      {
        name: 'Unpaid Invoices',
        query: {
          $or: [
            { pytReceived: { $in: [undefined, null] } },
            { pytDate: { $in: [undefined, null] } },
          ],
        }
      },
    ],
    columns: [
      { label: '#', field: 'number' },
      { label: 'Client', field: 'client',
        fn: (invoice) => {
          const { client, oneTimeClient } = invoice;
          if (client) return client.name;
          else if (oneTimeClient) return oneTimeClient.name;
          else return '';
        },
      },
      { label: 'Services', field: 'services.service',
        fn: (invoice) => {
          const services = invoice.services.map(service => {
            if (!service.description) {
              console.log('invoice: ', invoice);
              return;
            }
            return service.description.name
          });
          return services.join(', ');
        },
      },
      { label: 'Issue Date', field: 'issueDate', type: 'date' },
      { label: 'Sign Date', field: 'signDate', edit: { type: 'date' }, type: 'date' },
      { label: 'PYT Type', field: 'pytReceived', edit: { type: 'select', options: pytReceived } },
      { label: 'Remarks', field: 'remarks', edit: { type: 'input' }, color: 'red' },
      { label: 'Issued By', field: 'issuedBy' },
      { label: 'Amount Owing', field: 'total', type: 'currency' },
    ],
  };

  if (user.role === 'Administrator') {
    tables.columns.forEach((column) => {
      const { field } = column;
      if (field === 'issueDate') column.edit = { type: 'date' };
      if (field === 'issuedBy') column.edit = { type: 'select', options: users };
    });
  }

  return tables;
};
