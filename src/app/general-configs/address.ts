const address = [
  [
    { label: 'Unit', field: 'address.apartment' },
    { label: 'Street', field: 'address.street' },
    { label: 'City', field: 'address.city' },
  ],
  [
    { label: 'Province', field: 'address.province' },
    { label: 'Country', field: 'address.country' },
    { label: 'Postal Code', field: 'address.postalCode', mask: 'AAA AAA' },
  ]
];

const simpleAddress = [
  [
    { label: 'Unit', field: 'address.apartment' },
    { label: 'Street', field: 'address.street' },
    { label: 'City', field: 'address.city' },
    { label: 'Province', field: 'address.province' },
    { label: 'Country', field: 'address.country' },
    { label: 'Postal Code', field: 'address.postalCode', mask: 'AAA AAA' },
  ]
];

export { address, simpleAddress };
