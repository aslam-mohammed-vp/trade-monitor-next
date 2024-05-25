import { render, screen } from "@testing-library/react";
import { SocketStatus } from "../SocketStatus";
import "@testing-library/jest-dom";

describe("StockStatus", () => {
  it("shows socket conncted", () => {
    render(<SocketStatus status={true} />);
    expect(screen.getByText("Socket is connected")).toBeInTheDocument();
  });

  it("shows socket disconected", () => {
    render(<SocketStatus status={true} />);
    expect(screen.getByText("Socket is connected")).toBeInTheDocument();
  });
});
