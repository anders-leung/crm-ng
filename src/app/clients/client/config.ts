import pluralize from 'pluralize';

const inputsPerRow = 4;

export default (options) => {
  const rows = {
    client: [
      [
        { label: 'Client Name', field: 'name' },
        { label: 'Phone', field: 'phone' },
        { label: 'Email', field: 'email' },
        { label: 'Last Notified', field: 'notified', type: 'date' },
      ]
    ],
  };

  let row = [];
  Object.entries(options).forEach(([label, selections]) => {
    if (row.length === inputsPerRow) {
      rows.client.push(row);
      row = [];
    }
    const input = {
      label,
      field: `dynamic.${label.toLocaleLowerCase()}`,
      type: 'select',
      options: selections,
      multiple: pluralize.isPlural(label),
    };
    row.push(input);
  });
  rows.client.push(row);

  return rows;
};
