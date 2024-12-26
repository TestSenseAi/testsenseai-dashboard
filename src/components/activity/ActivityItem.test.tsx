import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import { ActivityItem } from './ActivityItem';

const mockActivity = {
  id: '1',
  type: 'test-passed' as const,
  description: 'Test suite completed successfully',
  timestamp: new Date('2024-03-10T10:00:00'),
  environment: 'production',
  metadata: {
    duration: 125,
    coverageChange: 2.5,
  },
};

describe('ActivityItem', () => {
  it('renders activity details correctly', () => {
    render(<ActivityItem activity={mockActivity} />);

    expect(screen.getByText(mockActivity.description)).toBeInTheDocument();
    expect(screen.getByText('production')).toBeInTheDocument();
  });

  it('toggles details view when More/Less button is clicked', () => {
    render(<ActivityItem activity={mockActivity} />);

    const toggleButton = screen.getByRole('button');
    expect(screen.queryByText('Duration:')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText('Duration:')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Duration:')).not.toBeInTheDocument();
  });

  it('shows correct icon based on activity type', () => {
    render(<ActivityItem activity={mockActivity} />);

    const icon = screen.getByTestId('activity-icon');
    expect(icon).toHaveAttribute('data-icon', 'check-circle');
  });
});
