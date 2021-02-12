import { Injectable } from '@angular/core';
import _ from 'lodash';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})

export class TableService {
  constructor() { }

  public exportAsExcelFile(data: any[], columns: any[], title: string): void {
    const headers = columns.map(column => column.visible === false ? '' : column.label);
    const footers = [];
    const numbers = [];
    const dates = [];
    const table = data.map((row, i) => {
      return columns.map((column, j) => {
        const { field, sum, visible, type } = column;
        if (visible === false || column.export === false) return;

        let value = _.get(row, field);

        if (value && type === 'date') {
          dates.push([j, i + 2]);
        }

        if (sum) {
          if (value) {
            const floatValue = parseFloat(value);
            if (floatValue != 0) {
              footers[j] = (footers[j] || 0) + floatValue;
              // + 2 because title and header rows go in front
              numbers.push([j, i + 2, type === 'currency']);
            } else {
              return '';
            }
          }
        }

        return value;
      });
    });

    const footerRow = table.length;
    footers.forEach((value, i) => {
      if (value) {
        numbers.push([i, footerRow + 2]);
        footers[i] = value.toFixed(2);
      } else {
        footers[i] = '';
      }
    });

    table.push(footers);
    table.unshift(headers);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([[title]]);
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length } }];
    XLSX.utils.sheet_add_json(worksheet, table, { skipHeader: true, origin: 'A2' });
    numbers.forEach(([c, r, currency]) => {
      const cell = worksheet[XLSX.utils.encode_cell({ c, r })];
      cell.t = 'n';
      if (currency) cell.z = '$0.00';
    });
    dates.forEach(([c, r]) => {
      const cell = worksheet[XLSX.utils.encode_cell({ c, r })];
      cell.t = 'd';
    });

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    /* save to file */
    XLSX.writeFile(workbook, `${title}.xlsx`);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
