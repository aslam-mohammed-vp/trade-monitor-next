"use client";
import { constants, tableHeaders } from "@/constants";
import styles from "./stock-list.module.scss";
import { HandlerFunctionType, Operation, StockDataMap } from "@/types/types";

// const gridComponent = (stockList: any, entities: any) => {
//   return (
//     <div>
//       <div className={style.grid}>
//         <span>
//           <strong>ISIN</strong>
//         </span>
//         <span>
//           <strong>PRICE</strong>
//         </span>
//       </div>
//       <div className={style.rows}>
//         {stockList?.map((id: string) => (
//           <div key={id} className={style.grid}>
//             <span>{entities[id].isin}</span>
//             <span>{entities[id].price}</span>
//           </div>
//         ))}
//       </div>
//       {JSON.stringify(stockData)}
//     </div>
//   );
// };

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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {stockList?.map((id: string) => (
          <tr
            key={id}
            className={`${styles.row} ${
              highlightedStocks.includes(id + "") ? styles.highlightRow : ""
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
              <a
                className={styles.btn}
                onClick={() => handleSubscribe(id, Operation.Unsubscribe)}
              >
                {constants.unsubscribe}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
