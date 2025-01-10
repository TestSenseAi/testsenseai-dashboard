import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { RecentActivity } from './RecentActivity';

describe('RecentActivity', () => {
  it('renders the component with correct heading', () => {
    render(<RecentActivity />);

    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('contains ActivityFeed component', () => {
    render(<RecentActivity />);

    // ActivityFeed should render a filter
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
