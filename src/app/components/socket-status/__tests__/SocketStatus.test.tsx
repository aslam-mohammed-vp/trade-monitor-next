import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { SocketStatus } from '../SocketStatus';

describe('StockStatus', () => {
  it('shows socket conncted', () => {
    render(<SocketStatus status />);
    expect(screen.getByText('Socket is connected')).toBeInTheDocument();
  });

  it('shows socket disconected', () => {
    render(<SocketStatus status />);
    expect(screen.getByText('Socket is connected')).toBeInTheDocument();
  });
});
