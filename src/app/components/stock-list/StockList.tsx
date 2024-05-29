'use client';

import { constants, tableHeaders } from '@/constants';
import type { HandlerFunctionType, StockDataMap } from '@/types/types';
import { Operation } from '@/types/types';

import styles from './stock-list.module.scss';

export default function StockList({
  stockData,
  highlightedStocks,
  handleSubscribe,
}: {
  stockData: StockDataMap;
  highlightedStocks: string[];
  handleSubscribe: HandlerFunctionType;
}) {
  const stockList = Object.keys(stockData);

  return (
    <table className={styles.table} id="table">
      <thead className={styles.header}>
        <tr className={styles.row}>
          <th className={`${styles.cell} ${styles.textLeft}`}>
            {tableHeaders.isin}
          </th>
          <th className={`${styles.cell} ${styles.textRight}`}>
            {tableHeaders.price}
          </th>
          <th className={`${styles.cell} ${styles.textRight}`}>
            {tableHeaders.ask}
          </th>
          <th className={`${styles.cell} ${styles.textRight}`}>
            {tableHeaders.bid}
          </th>

          <th aria-label="Subscribe Button Column" />
        </tr>
      </thead>
      <tbody>
        {stockList?.map((id: string) => (
          <tr
            key={id}
            className={`${styles.row} ${
              highlightedStocks.includes(`${id}`) ? styles.highlightRow : ''
            }`}
          >
            <td className={`${styles.cell} ${styles.isin}`}>
              {stockData[id].isin}
            </td>
            <td
              className={`${styles.cell} ${styles.price} ${styles.textRight}`}
            >
              {Math.ceil(stockData[id].price)}
            </td>
            <td className={`${styles.cell} ${styles.ask} ${styles.textRight}`}>
              {Math.ceil(stockData[id].ask)}
            </td>
            <td className={`${styles.cell} ${styles.bid} ${styles.textRight}`}>
              {Math.ceil(stockData[id].bid)}
            </td>
            <td
              className={`${styles.cell} ${styles.unsubscribe} ${styles.textCenter}`}
            >
              <button
                type="button"
                className={styles.btn}
                onClick={() => handleSubscribe(id, Operation.Unsubscribe)}
              >
                {constants.unsubscribe}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
