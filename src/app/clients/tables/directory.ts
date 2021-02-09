import { deleteRow } from 'src/app/globals';

const columns = {
  clients: [
    { label: 'Client Name', field: 'client', fn: (client) => client.clientName, sticky: true },
    { label: 'Spouse', field: 'spouse', fn: (client) => client.spouseName },
    { label: 'Status', field: 'status' },
    { label: 'Type', field: 'clientType' },
    { label: 'Nw Client Date', field: 'newClientDate', type: 'date' },
    { label: 'Refer By', field: 'referBy' },
    {
      label: 'Services', field: 'services', fn: (client) => {
        return client.services.map(service => service.name).join(', ');
      }
    },
    { label: 'Group', field: 'group' },
    { label: 'Review Date', field: 'reviewDate', type: 'date' },
    { label: 'AA Done Date', field: 'aaDoneDate', type: 'date' },
    { label: 'KYC Date', field: 'recentKYC', type: 'date' },
  ],
  contacts: [
    { label: 'Client Name', field: 'client', fn: (client) => client.clientName, sticky: true },
    { label: 'Spouse', field: 'spouse', fn: (client) => client.spouseName },
    { label: 'Email', field: 'email' },
    { label: 'Phone 1', field: 'phones.0.number' },
    { label: 'Phone 2', field: 'phones.1.number' },
    { label: 'Address', field: 'address' },
    { label: 'Type', field: 'types' },
    { label: 'Phones', field: 'phones', visible: false },
  ],
  employement: [
    { label: 'Client Name', field: 'client', fn: (client) => client.clientName },
    { label: 'Employer', field: 'client.employer.name' },
    { label: 'Address', field: 'client.employer.address' },
    { label: 'Tel #', field: 'client.employer.phone' },
    { label: 'Years of Service', field: 'client.employer.yearsOfService' },
    { label: 'Industry', field: 'client.employer.industry' },
    { label: 'Spouse Name', field: 'spouse', fn: (client) => client.spouseName },
    { label: 'Sp Employer', field: 'spouse.employer.name' },
    { label: 'Sp Address', field: 'spouse.employer.address' },
    { label: 'Sp Tel #', field: 'spouse.employer.phone' },
    { label: 'Sp Years of Service', field: 'spouse.employer.yearsOfService' },
    { label: 'Sp Industry', field: 'spouse.employer.industry' },
    { label: 'Client Title', field: 'client.title', visible: false },
    { label: 'Client First Name', field: 'client.firstName', visible: false },
    { label: 'Client Last Name', field: 'client.lastName', visible: false },
    { label: 'Spouse Title', field: 'spouse.title', visible: false },
    { label: 'Spouse First Name', field: 'spouse.firstName', visible: false },
    { label: 'Spouse Last Name', field: 'spouse.lastName', visible: false },
  ],
  services: [
    { label: 'Client Name', field: 'client', fn: (client) => client.clientName, sticky: true },
    { label: 'Spouse', field: 'spouse', fn: (client) => client.spouseName },
    {
      label: 'Services', field: 'services', fn: (client) => {
        return client.services.map(service => service.name).join(', ');
      }
    },
    { label: 'Calendar', field: 'calendar' },
    { label: 'KYC Update', field: 'recentKYC', type: 'date' },
    { label: 'AA Date', field: 'aaDate', type: 'date' },
    { label: 'Last Review Date', field: 'lastReviewDate', type: 'date' },
  ],
}

const table = (user) => {
  const tables: any = {
    tabs: [
      {
        name: 'Clients',
        query: {
          status: 'Active',
        },
        columns: columns.clients,
      },
      {
        name: 'Contact',
        query: {
          status: 'Active',
        },
        columns: columns.contacts,
      },
      {
        name: 'Employment',
        query: {
          status: 'Active',
        },
        columns: columns.employement,
      },
      {
        name: 'Services',
        query: {
          status: 'Active',
        },
        columns: columns.services,
      },
    ],
    columns: columns.clients,
  };

  return tables;
}

export { table };
