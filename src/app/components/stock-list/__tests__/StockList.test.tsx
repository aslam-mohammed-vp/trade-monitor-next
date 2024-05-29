import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { StockDataMap } from "@/types/types";

import StockList from "../StockList";

const stockData: StockDataMap = {
  1: { isin: "1", price: 12, ask: 13, bid: 14 },
  2: { isin: "1", price: 12, ask: 13, bid: 14 },
};

// jest.mock("consts", () => require("../../../../consts/consts"));

const mockHandleSubscribe = jest.fn();

describe("StockList", () => {
  const renderComponent = () =>
    render(
      <StockList
        stockData={stockData}
        highlightedStocks={[]}
        handleSubscribe={mockHandleSubscribe}
      />,
    );
  it("shows stock list with details and unsubscribe button", () => {
    renderComponent();
    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getAllByText("Unsubscribe")).toHaveLength(2);
  });

  it("Unsubscribe is working", async () => {
    renderComponent();
    const btn = screen.getAllByText("Unsubscribe");
    // fireEvent.click(btn[0]);
    await userEvent.click(btn[0]);
    expect(mockHandleSubscribe).toHaveBeenCalled();
  });
});
