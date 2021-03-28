const table = (options) => {
  const { descriptions, users } = options;
  const today = new Date();
  const month = today.getMonth();
  const year = month >= 2 ? today.getFullYear() : today.getFullYear() - 1;

  const table: any = {
    tabs: [
      {
        name: 'Current Year End',
        query: {
          issueDate: {
            $gt: new Date(year, 2, 0),
            $lt: new Date(year + 1, 2, 1),
          },
        },
      },
      {
        name: 'All',
        query: {},
      },
    ],
    columns: [
      { label: 'Preparer', field: '_id', sticky: true },
      { label: 'Total A/R', field: 'total', sum: true, type: 'currency' },
    ],
  };

  descriptions.forEach((description) => {
    const { _id, name } = description;
    const column = {
      label: name,
      field: name,
      sum: true,
      type: 'currency',
    }
    table.columns.push(column);
  });

  // table.columns.push(
  //   {
  //     label: 'GST Rec',
  //     field: 'gst',
  //     sum: true,
  //     type: 'currency',
  //     fn: (invoice) => invoice.gst === '0.00' ? '' : invoice.gst,
  //   },
  //   {
  //     label: 'PST Rec',
  //     field: 'pst',
  //     sum: true,
  //     type: 'currency',
  //     fn: (invoice) => invoice.pst === '0.00' ? '' : invoice.pst,
  //   }
  // );

  // table.columns.push({ ...deleteRow });
  // table.columns.push({ label: 'Company', field: 'company', visible: false });

  return table;
}

export { table };
