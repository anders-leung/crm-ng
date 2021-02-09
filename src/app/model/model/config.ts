import { contacts, nrContacts, address, officers, shareholders } from '../../general-configs';

const config = (options) => {
  const { terms, services, groups } = options;
  const clientTypes = options['client types'];

  return {
    person: [
      [
        { label: 'Salutation', field: 'title' },
        { label: 'First Name', field: 'firstName' },
        { label: 'Last Name', field: 'lastName' },
        { label: 'Age', field: 'age' },
      ],
      [
        { label: 'Date of Birth', field: 'dateOfBirth', type: 'date' },
        { label: 'Driver\'s License #', field: 'driversLicense.number' },
        { label: 'Driver\'s License Expiry', field: 'driversLicense.expiry', type: 'date' },
        { label: 'Land Date', field: 'landDate', type: 'date' },
      ],
    ],
    client: [
      [
        { label: 'Status', field: 'status' },
        { label: 'Type', field: 'clientType', type: 'select', options: clientTypes, multiple: true },
        { label: 'New Client Date', field: 'newClientDate', type: 'date' },
        { label: 'Refer By', field: 'referBy' },
      ],
      [
        { label: 'Services', field: 'services', type: 'select', options: services, multiple: true, none: false },
        { label: 'Group', field: 'group', type: 'autocomplete', options: groups },
      ],
      [
        { label: 'Review Date', field: 'reviewDate', type: 'date' },
        { label: 'AA Done Date', field: 'aaDoneDate', type: 'date' },
        { label: 'KYC Date', field: 'recentKYC', type: 'date' },
        { label: 'Marriage Anniversary', field: 'marriageAnniversary', type: 'date' },
      ],
      [
        { label: 'CPP Date', field: 'cpp.date' },
        { label: 'CPP Amount', field: 'cpp.amount' },
        { label: 'OAS Date', field: 'oas.date' },
        { label: 'OAS Amount', field: 'oas.amount' },
      ]
    ],
    employer: [
      [
        { label: 'Name', field: 'name' },
        { label: 'Address', field: 'address' },
        { label: 'Phone', field: 'phone' },
      ],
      [
        { label: 'Occupation', field: 'occupation' },
        { label: 'Years of Service', field: 'yearsOfService' },
        { label: 'Industry', field: 'industry' },
      ],
    ],
    contact: [
      [
        { label: 'Address', field: 'address' },
      ],
      [
        {
          type: 'form', field: 'emails', name: 'email', config: [
            [
              { label: 'Note', field: 'note' },
              { label: 'Email', field: 'address' },
            ],
          ]
        },
      ],
      [
        {
          type: 'form', field: 'phones', name: 'phone', config: [
            [
              { label: 'Note', field: 'note' },
              { label: 'Number', field: 'number', mask: '(000) 000-0009 0*' },
            ],
          ]
        },
      ],
    ],
    dependents: [
      [
        {
          type: 'form', field: 'dependents', name: 'dependent', config: [
            [
              { label: 'First Name', field: 'firstName' },
              { label: 'Last Name', field: 'lastName' },
              { label: 'Relationship', field: 'relationship', },
              { label: 'Date of Birth', field: 'dateOfBirth', type: 'date' },
              { label: 'Age', field: 'age' },
            ],
          ]
        },
      ],
    ],
    insurances: [
      [
        {
          type: 'form', field: 'insurances', name: 'insurance', config: [
            [
              { label: 'Term', field: 'term', type: 'select', options: terms, none: false },
              { label: 'Policy Date', field: 'policyDate', type: 'date' },
              { label: 'Policy Number', field: 'policyNumber' },
            ],
            [
              { label: 'Premium', field: 'premium', type: 'checkbox' },
              { label: 'ADP', field: 'adp', type: 'checkbox' },
              { label: 'Renewal', field: 'renewal', type: 'checkbox' },
            ],
            [
              { label: 'Expiry', field: 'expiry', type: 'date' },
              { label: 'Insured Amount', field: 'insured' },
              { label: 'Issue Date', field: 'issueDate', type: 'date' },
            ],
            [
              { label: 'Anniversary Month', field: 'anniversaryMonth' },
              { label: 'Mature Date', field: 'matureDate', type: 'date' },
              { label: 'Term Renewal', field: 'termRenewal' },
            ],
            [
              { label: 'UL Investment', field: 'ulInvestment' },
              { label: 'Remarks', field: 'remarks' },
            ],
            [
              {
                type: 'form', field: 'beneficiaries', name: 'beneficiary', config: [
                  [
                    { label: 'Name', field: 'name' },
                    { label: 'SIN', field: 'sin' },
                    { label: 'Relationship', field: 'relationship' },
                    { label: 'Percentage', field: 'percentage' },
                  ],
                ],
              },
            ],
          ],
        },
      ],
    ],
    contacts,
  };
}

export { config };