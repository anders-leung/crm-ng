import { deleteRow } from 'src/app/globals';

const table = (user) => {
  const tables: any = {
    tabs: [
      {
        name: 'Insurance',
        query: {
          status: 'Active',
        },
      },
    ],
    columns: [
      { label: 'Client', field: 'clientName', fn: (insurance) => {
        const { client } = insurance;
        let clientName = '';
        if (client.title) clientName = `${client.title} `;
        if (client.firstName) clientName += `${client.firstName} `;
        if (client.firstName) clientName += client.lastName;
        
        return clientName;
      } },
      { label: 'Type', field: 'term.name' },
      { label: 'Policy Start', field: 'policyStart', edit: { type: 'date' }, type: 'date' },
      { label: 'Insure Amt', field: 'insuredAmount', edit: { type: 'input' } },
      { label: 'Premium', field: 'premium', edit: { type: 'input' } },
      { label: 'Premium Mode', field: 'premiumMode', edit: { type: 'input' } },
      { label: 'Remark', field: 'remarks', edit: { type: 'input' } },
      { label: 'Payment End', field: 'paymentEnd', edit: { type: 'input' } },
      { label: 'Beneficiary', field: 'beneficiary', edit: { type: 'input' } },
      { label: 'Client ID', field: 'redirectId', fn: (insurance) => insurance.clientId, visible: false },
    ],
  };

  return tables;
}

export { table };
