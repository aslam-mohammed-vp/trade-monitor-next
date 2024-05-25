"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import StockList from "../stock-list/StockList";
import SubscribeStockForm from "../subscribe-stock-form";

import styles from "./manage-stocks.module.scss";
import {
  addToWatchlist,
  removeFromWatchList,
  stockDataSelector,
  updateStockData,
  watchListSelector,
} from "@/store/features/stock/stockSlice";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Operation } from "@/types/types";
import SocketStatus from "../socket-status/";
import { validateISIN } from "@/utils/formUtils";
import { errorMessages } from "@/constants/constants";

export default function ManageStocks() {
  const watchList = useAppSelector(watchListSelector);
  const stockData = useAppSelector(stockDataSelector);
  const dispatch = useAppDispatch();

  const URL = "ws://localhost:8425/";

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
        console.error("unsupported operation");
    }
  };

  useEffect(() => {
    console.log(lastMessage);
    if (lastMessage?.data) {
      const data = JSON.parse(lastMessage?.data);
      if (watchList.includes(data.isin + "")) {
        dispatch(updateStockData(data));
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (watchList.length >= 1)
      sendMessage(
        `{"${Operation.Subscribe}": "${watchList[watchList.length - 1]}"}`
      );
  }, [watchList]);

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
        <SocketStatus status={readyState === ReadyState.OPEN ? true : false} />
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
