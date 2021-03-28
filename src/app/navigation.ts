export const navigation = [
  {
    name: 'Users',
    url: '/users',
  },
  {
    name: 'Roles',
    url: '/roles',
  },
  {
    name: 'Options',
    url: '/options',
  },
  {
    name: 'Clients',
    url: '/clients',
  },
  {
    name: 'Invoices',
    children: [
      {
        name: 'New Invoice',
        url: '/invoices/new',
      },
      {
        name: 'Outstanding',
        url: '/invoices/outstanding',
      },
      {
        name: 'All',
        url: '/invoices/all',
        role: 'Administrator',
      },
    ],
  },
];
