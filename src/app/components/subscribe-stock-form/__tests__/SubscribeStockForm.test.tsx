import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SubscribeStockForm from "../SubscribeStockForm";

const mockHandleSubscribe = jest.fn();
const mockValidateFn = jest.fn();

describe("Subscribe Stock Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const renderComponent = () =>
    render(
      <SubscribeStockForm
        validateFn={mockValidateFn}
        handleSubscribe={mockHandleSubscribe}
      />,
    );
  it("shows form with textbox and button", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("validation is working", async () => {
    mockValidateFn.mockImplementationOnce(() => false);
    renderComponent();
    const btn = screen.getByRole("button");
    const textField = screen.getByRole("textbox");
    await userEvent.type(textField, "val");
    await userEvent.click(btn);

    expect(mockValidateFn).toHaveBeenCalled();
  });

  it("Subscribe click is working", async () => {
    const fnn = jest.fn(() => true);
    fnn.mockImplementation(() => true);
    render(
      <SubscribeStockForm
        validateFn={fnn}
        handleSubscribe={mockHandleSubscribe}
      />,
    );
    const btn = screen.getByRole("button");
    const textField = screen.getByRole("textbox");
    await userEvent.type(textField, "DE000BASF111");
    await userEvent.click(btn);

    screen.debug();

    expect(fnn).toHaveBeenCalled();
    expect(mockHandleSubscribe).toHaveBeenCalled();
  });
});
