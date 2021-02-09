import _ from 'lodash';
import { deleteRow } from 'src/app/globals';

const phone = (contact, type) => {
  const phones = _.get(contact, 'phones', []);
  const [phone] = phones.filter(phone => phone.phoneType === type);
  if (phone) {
    const { number, extension } = phone;
    if (extension) return `${number} ext. ${extension}`;
    return number;
  }
  return '' || _.get(contact, type.toLowerCase(), '');
}

const table = (user) => {
  const tables = {
    tabs: [
      {
        name: 'Contact Directory',
        query: {}
      },
    ],
    columns: [
      { label: 'Contact Name', field: 'name', },
      { label: 'Category', field: 'category', },
      { label: 'Work', field: 'work', fn: (contact) => phone(contact, 'Work') },
      { label: 'Cell', field: 'cell', fn: (contact) => phone(contact, 'Cell') },
      { label: 'Email', field: 'email', },
      { label: 'Remarks', field: 'remarks', color: 'red', edit: { type: 'input' } },
      { label: 'Phones', field: 'phones', visible: false },
    ],
  };

  if (user.role === 'Administrator') {
    tables.columns.push({ label: 'Account No.', field: 'accountNumber' }, deleteRow);
  }

  return tables;
}

export { table };
