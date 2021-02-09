const table = (options) => {
  const { types } = options;
  const columns = [
    { label: 'Position', field: 'position', edit: { type: 'input' } },
    { label: 'Name', field: 'name', edit: { type: 'input' } },
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
    addForm.default = { type };

    tabs.push({
      name: type,
      query: { type },
      columns: specificColumns,
      addForm,
    });
  });
  
  const tables = {
    tabs,
    columns,
    addForm,
  };

  return tables;
};

export { table };
