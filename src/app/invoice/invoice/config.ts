const numberWithCommas = (x) => {
  if (!x) return '';
  let commaNumber = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (commaNumber[0] === '-') {
    commaNumber = `-${commaNumber.replace(/-/, '$')}`;
  } else {
    commaNumber = `$${commaNumber}`;
  }
  let [integer, decimals] = commaNumber.split('.');
  while (decimals.length < 2) {
    commaNumber += '0';
    decimals += '0';
  }
  return commaNumber;
};

const InvoiceConfig = (options) => {
  const { clients, services, users } = options;
  const descriptionMap = {};
  const descriptions = services.map((service) => {
    descriptionMap[service._id] = service.name;
    return { label: service.name, value: service._id };
  });

  return {
    client: [
      [
        { label: 'Client', field: 'name', type: 'autocomplete', options: clients },
      ],
    ],
    form: [
      // [
      //   { label: 'Street Address', field: 'address.street' },
      //   { label: 'City', field: 'address.city' },
      //   { label: 'Postal Code', field: 'address.postalCode', mask: 'AAA AAA' },
      // ],
      [
        { label: 'Phone', field: 'phone', mask: '(000) 000-0009 0*' },
        // { label: 'Fax', field: 'fax' },
        // ],
        // [
        { label: 'Email', field: 'email' },
      ],
    ],
    preparer: [
      [
        { label: 'Preparer', field: 'issuedBy', type: 'select', options: users, none: false },
      ],
    ],
    services: {
      title: (service) => {
        if (service.description) {
          const selection = descriptionMap[service.description];
          return selection;
        }
        return 'New Service';
      },
      description: [
        {
          mapping: (service) => {
            const { amount } = service;
            return [[numberWithCommas(amount)]];
          },
        },
      ],
      form: [
        [
          { label: 'Service', field: 'description', type: 'select', options: descriptions, none: false },
          { label: 'Amount', field: 'amount', mask: 'separator,2', prefix: '$', thousandSeparator: ',', dropSpecialCharacters: true },
          { label: 'GST', field: 'gst', type: 'checkbox' },
          { label: 'PST', field: 'pst', type: 'checkbox' },
          // { label: 'GST', field: 'gst', check: { field: 'applyGst', label: '', defaultValue: true }, disabled: true },
          // { label: 'PST', field: 'pst', check: { field: 'applyPst', label: '' }, disabled: true },
        ],
        [
          { label: 'Description', field: 'details', textarea: true, rows: 5 },
        ],
      ],
    },
    sums: [
      [
        { label: 'GST', field: 'gst', disabled: true },
        { label: 'PST', field: 'pst', disabled: true },
        { label: 'Total', field: 'total', disabled: true },
      ]
    ]
  };
};

export { InvoiceConfig };
