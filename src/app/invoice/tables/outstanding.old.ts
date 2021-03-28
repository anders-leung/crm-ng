export default (options) => {
  const { descriptions } = options;
  const table: any = {
    tabs: [
      {
        name: 'Outstanding Invoices',
        query: {
          $or: [
            { pytReceived: '' },
            { pytReceived: { $eq: null } },
            { pytReceived: { $exists: false } },
          ],
        }
      },
    ],
    columns: [
      { label: '#', field: 'number', fn: (invoice) => invoice.number },
      { label: 'Issue Date', field: 'issueDate', edit: { type: 'date' }, type: 'date' },
      {
        label: 'Client', field: 'client',
        fn: (invoice) => {
          const { client, oneTimeClient } = invoice;
          if (client) return client.name;
          else if (oneTimeClient) return oneTimeClient.name;
          else return '';
        },
      },
      { label: 'Total A/R', field: 'total', sum: true, type: 'currency' },
    ],
  };

  descriptions.forEach((description) => {
    const { _id, name } = description;
    const column = {
      label: name,
      field: name,
      fn: (invoice) => {
        let sum = 0;
        invoice.services.forEach((service) => {
          if (!service.description) return;
          if (service.description._id === _id) {
            sum += parseFloat(service.amount);
          }
        });
        return sum != 0 ? sum.toFixed(2) : '';
      },
      sum: true,
      type: 'currency',
    }
    table.columns.push(column);
  });

  table.columns.push(
    {
      label: 'GST Rec',
      field: 'gst',
      sum: true,
      type: 'currency',
      fn: (invoice) => invoice.gst === '0.00' ? '' : invoice.gst,
    },
    {
      label: 'PST Rec',
      field: 'pst',
      sum: true,
      type: 'currency',
      fn: (invoice) => invoice.pst === '0.00' ? '' : invoice.pst,
    }
  );

  table.columns.push({ label: 'Company', field: 'company', visible: false });

  return table;
};
