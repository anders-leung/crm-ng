const table = (options) => {
  const { types } = options;
  const columns = [
    { label: 'Position', field: 'position', edit: { type: 'input' } },
    { label: 'Name', field: 'name', edit: { type: 'input' } },
    { label: 'Hidden Details', field: 'details', visible: false },
  ];
  const addForm: any = {
    form: [
      [
        { label: 'Type', field: 'type', type: 'autocomplete', options: types }
      ],
      [
        { label: 'Position', field: 'position' },
        { label: 'Name', field: 'name' },
      ],
    ],
  };
  const tabs = [];
  if (types.length === 0) {
    tabs.push({
      name: 'Default',
      query: {},
      addForm: {},
    });
  }

  types.forEach((type) => {
    let specificColumns = undefined;
    let specificAddForm = { ...addForm };
    specificAddForm.default = { type };

    if (type === 'Service') {
      specificColumns = [...columns];
      specificColumns.splice(2, 0, {
        label: 'Details',
        field: 'expandShouldNotExist',
        type: 'expandButton',
        expand: () => true,
        color: '#1976D2',
      });

      specificAddForm.form = [
        ...specificAddForm.form,
        [{ label: 'Details', field: 'details', textarea: true, rows: 15 }]
      ];
    }

    tabs.push({
      name: type,
      query: { type },
      columns: specificColumns,
      addForm: specificAddForm,
    });
  });

  const tables = {
    tabs,
    columns,
    addForm,
    expandForm: [
      [
        { label: 'Details', field: 'details', textarea: true, rows: 5 },
      ],
    ],
  };

  return tables;
};

export { table };
