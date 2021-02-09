const config = (options) => {
  const { types, phoneTypes } = options;
  return {
    contact: [
      [
        { label: 'Name', field: 'name' },
        { label: 'Category', field: 'category', type: 'select', options: types },
      ],
      [
        { label: 'Email', field: 'email' },
        { label: 'Website', field: 'website' },
      ],
      [
        {
          type: 'form', field: 'phones', name: 'phone', config: [
            [
              { label: 'Type', field: 'phoneType', type: 'select', options: phoneTypes },
              { label: 'Number', field: 'number', mask: '(000) 000-0009 0*' },
              { label: 'Extension', field: 'extension' },
            ],
          ]
        },
      ],
      [
        { label: 'Street', field: 'address.street' },
        { label: 'City', field: 'address.city' },
        { label: 'Province', field: 'address.province' },
        { label: 'Postal Code', field: 'address.postalCode', mask: 'AAA AAA' },
      ],
      [
        { label: 'Remarks', field: 'remarks' },
      ],
    ],
    adminOnly: [
      [
        { label: 'Account No.', field: 'accountNumber' },
      ]
    ]
  };
}

export { config };