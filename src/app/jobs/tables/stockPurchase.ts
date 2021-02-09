import { get } from 'lodash';
import { exists, notExists, yesNo } from '../../globals';

export default (data) => {
  const { clients, jobs} = data;
  const stockPurchase = jobs.find(job => job.label === 'Stock Purchase').value;

  const acb = (job) => {
    const { unitCost, shares, buyCommission } = get(job, 'stockPurchase', {});
    return ((unitCost || 0) * (shares || 0)) + (buyCommission || 0);
  };
  
  const proceed = (job) => {
    const { sellPrice, sellUnit, sellCommission } = get(job, 'stockPurchase', {});
    return ((sellPrice || 0) * (sellUnit || 0)) + (sellCommission || 0);
  };

  const netGain = (job) => {
    return proceed(job) - acb(job);
  };

  const gain = (job) => {
    return netGain(job) / acb(job) * 100;
  };

  const tab = {
    tabs: [
      {
        name: 'Stock',
        query: {
          type: stockPurchase,
          private: { $ne: true },
          done: notExists,
        },
      },
      {
        name: 'Stock Done',
        query: {
          type: stockPurchase,
          private: { $ne: true },
          done: exists,
        },
      },
    ],
    columns: [
      { label: 'Name', field: 'client', fn: (job) => job.client.clientName, sticky: true },
      { label: 'Acct', field: 'stockPurchase.account', edit: { type: 'input' } },
      { label: 'Ticker', field: 'stockPurchase.ticker', edit: { type: 'input' } },
      { label: 'B Date', field: 'stockPurchase.buyDate', edit: { type: 'date' } },
      { label: 'Unit Cost', field: 'stockPurchase.unitCost', edit: { type: 'input', mask: '0*' } },
      { label: 'No of Shares', field: 'stockPurchase.shares', edit: { type: 'input', mask: '0*' } },
      { label: 'B Comm', field: 'stockPurchase.buyCommission', edit: { type: 'input', mask: '0*' } },
      { label: 'ACB', field: 'acb', fn: acb },
      { label: 'Market Value', field: 'stockPurchase.marketValue', edit: { type: 'input', mask: '0*' } },
      { label: 'S Date', field: 'stockPurchase.sellDate', edit: { type: 'date' } },
      { label: 'Sell Price', field: 'stockPurchase.sellPrice', edit: { type: 'input', mask: '0*' } },
      { label: 'Sell Unit', field: 'stockPurchase.sellUnit', edit: { type: 'input', mask: '0*' } },
      { label: 'S Comm', field: 'stockPurchase.sellCommission', edit: { type: 'input', mask: '0*' } },
      { label: 'Proceed', field: 'proceed', fn: proceed },
      { label: 'Net Gain', field: 'netGain', fn: netGain },
      { label: '% Gain', field: 'gain', fn: gain, type: 'percent' },
      { label: 'Dividend', field: 'stockPurchase.dividend', edit: { type: 'input' } },
      { label: 'Move To Sold', field: 'done', edit: { type: 'date' } },
    ],
    addForm: {
      form: [
        [
          { label: 'Client', field: 'client', type: 'autocomplete', options: clients.map(client => client.label) }
        ],
        [
          { label: 'Type', field: 'type', type: 'select', options: jobs },
        ],
      ],
      onSubmit: (data) => {
        const clientName = data.client;
        const client = clients.find(client => client.label === clientName);
        data.client = client.value;
      },
      default: { type: stockPurchase },
    },
  };

  return tab;
}
