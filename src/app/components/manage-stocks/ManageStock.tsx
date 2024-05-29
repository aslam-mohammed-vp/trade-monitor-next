'use client';

import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { errorMessages } from '@/constants/constants';
import {
  addToWatchlist,
  removeFromWatchList,
  stockDataSelector,
  updateStockData,
  watchListSelector,
} from '@/store/features/stock/stockSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Operation } from '@/types/types';
import { validateISIN } from '@/utils/formUtils';

import SocketStatus from '../socket-status';
import StockList from '../stock-list/StockList';
import SubscribeStockForm from '../subscribe-stock-form';
import styles from './manage-stocks.module.scss';

export default function ManageStocks() {
  const watchList = useAppSelector(watchListSelector);
  const stockData = useAppSelector(stockDataSelector);
  const dispatch = useAppDispatch();

  const URL = 'ws://localhost:8425/';

  const { sendMessage, lastMessage, readyState } = useWebSocket(URL);

  const [highlightedStock, setHighlightedStock] = useState<string[]>([]);

  const handleSubscription = (id: string, operation: Operation) => {
    sendMessage(`{"${operation}": "${id}"}`);
    switch (operation) {
      case Operation.Subscribe:
        dispatch(addToWatchlist(id));
        break;
      case Operation.Unsubscribe:
        dispatch(removeFromWatchList(id));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (lastMessage?.data) {
      const data = JSON.parse(lastMessage?.data);
      if (watchList.includes(`${data.isin}`)) {
        dispatch(updateStockData(data));
      }
    }
  }, [lastMessage, watchList, dispatch]);

  useEffect(() => {
    if (watchList.length >= 1)
      sendMessage(
        `{"${Operation.Subscribe}": "${watchList[watchList.length - 1]}"}`,
      );
  }, [watchList, sendMessage, dispatch]);

  const validate = (isin: string) => {
    const message = validateISIN(isin, watchList);
    if (message === errorMessages.existingISIN) {
      setHighlightedStock((prev) => [...prev, isin]);
      setTimeout(() => {
        setHighlightedStock([]);
      }, 5000);
    }
    return message;
  };

  return (
    <div className={styles.manageStocks}>
      <div>
        <SocketStatus status={readyState === ReadyState.OPEN} />
      </div>
      <div className={styles.center}>
        <SubscribeStockForm
          validateFn={validate}
          handleSubscribe={handleSubscription}
        />
      </div>
      <div className={styles.center}>
        <StockList
          stockData={stockData}
          highlightedStocks={highlightedStock}
          handleSubscribe={handleSubscription}
        />
      </div>
    </div>
  );
}
