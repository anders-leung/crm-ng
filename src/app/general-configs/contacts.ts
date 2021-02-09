const phoneTypes = ['Work', 'Cell', 'Fax', 'Home'];

const contacts = [
  [
    { label: 'Salutation', field: 'title' },
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
  ],
  [
    {
      type: 'form', field: 'emails', name: 'email', config: [
        [
          { label: 'Type', field: 'emailType', type: 'select', multiple: true, options: ['Default', 'Accounts', 'For Sign', 'Do Not Send'] },
          { label: 'Email', field: 'address' },
        ],
      ]
    },
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
];

const nrContacts = [
  [
    { label: 'Type', field: 'type', type: 'select', options: ['Agent', 'Client', 'Lawyer', 'Property Manager'] },
    { label: 'Salutation', field: 'title' },
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
  ],
  [
    { label: 'Address', field: 'fullAddress' },
    { label: 'Company', field: 'company' },
    { label: 'Agent Number', field: 'number' },
  ],
  [
    {
      type: 'form', field: 'emails', name: 'email', config: [
        [
          { label: 'Type', field: 'emailType', type: 'select', multiple: true, options: ['Default', 'Accounts', 'Sign'] },
          { label: 'Email', field: 'address' },
        ],
      ]
    },
    {
      type: 'form', field: 'phones', name: 'phone', config: [
        [
          { label: 'Type', field: 'phoneType', type: 'select', options: phoneTypes },
          { label: 'Number', field: 'number' },
          { label: 'Extension', field: 'extension' },
        ],
      ]
    },
  ],
];

export { contacts, nrContacts };
