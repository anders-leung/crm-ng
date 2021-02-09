import { deleteRow } from 'src/app/globals';

const table = (options) => {
  const { types } = options;
  const columns = [
    { label: 'Position', field: 'position', edit: { type: 'input' } },
    { label: 'Name', field: 'name', edit: { type: 'input' } },
    { ...deleteRow },
    { label: 'Hidden Details', field: 'details', visible: false },
  ];

  const tables = {
    tabs: [],
    columns,
    expandForm: [
      [
        { label: 'Details', field: 'details', textarea: true, rows: 5 },
      ],
    ],
  };

  types.forEach((type) => {
    let specificColumns = undefined;
    let addForm: any = {
      form: [
        [
          { label: 'Type', field: 'type', type: 'autocomplete', options: types }
        ],
        [
          { label: 'Position', field: 'position' },
          { label: 'Name', field: 'name' },
        ],
      ],
      default: { type },
    };

    if (type === 'Industry') {
      specificColumns = [...columns];
      specificColumns.shift();

      addForm.form = [
        [
          { label: 'Type', field: 'type', type: 'autocomplete', options: types }
        ],
        [
          { label: 'Name', field: 'name' },
        ],
      ];
    }

    if (type === 'Description') {
      specificColumns = [...columns];
      specificColumns.splice(2, 0, {
        label: 'Details',
        field: 'expandShouldNotExist',
        type: 'expandButton',
        expand: () => true,
        color: '#1976D2',
      });

      addForm.form = [
        [
          { label: 'Type', field: 'type', type: 'autocomplete', options: types }
        ],
        [
          { label: 'Position', field: 'position' },
          { label: 'Name', field: 'name' },
        ],
        [
          { label: 'Data', field: 'data', textarea: true, rows: 15 },
        ],
      ];
    }

    tables.tabs.push({
      name: type,
      query: { type },
      columns: specificColumns,
      addForm,
    });
  });

  return tables;
};

export { table };
