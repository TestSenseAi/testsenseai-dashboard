import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import { ActivityFilter } from './ActivityFilter';

describe('ActivityFilter', () => {
  it('renders with default value', () => {
    const onChange = vi.fn();
    render(<ActivityFilter value='all' onChange={onChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('all');
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    render(<ActivityFilter value='all' onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'tests' } });

    expect(onChange).toHaveBeenCalledWith('tests');
  });

  it('displays all filter options', () => {
    const onChange = vi.fn();
    render(<ActivityFilter value='all' onChange={onChange} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveValue('all');
    expect(options[1]).toHaveValue('tests');
    expect(options[2]).toHaveValue('cases');
    expect(options[3]).toHaveValue('ci');
  });
});
