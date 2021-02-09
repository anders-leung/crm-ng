import { contacts, nrContacts, address, officers, shareholders } from '../../general-configs';

const config = (options) => {
  const { user } = options;

  return {
    user: [
      [
        { label: 'Name', field: 'name', },
        { label: 'Initials', field: 'initials', readonly: true },
      ],
      [
        { label: 'Email', field: 'email', readonly: true },
        { label: 'Password', field: 'password', inputType: 'password' },
      ],
      [
        // { label: 'Job Assignment Notifications', field: 'notifications', type: 'select', options: ['T1', 'T2', 'BK', 'PR', 'T1134', 'T5', 'NR'], multiple: true },
      ],
    ],
  };
}

export { config };