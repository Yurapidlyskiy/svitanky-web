import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders the default variant with its base classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('bg-primary');
  });

  it('fires onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('lets a custom className override a conflicting variant class', () => {
    render(<Button className="bg-blue-500">Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('bg-blue-500');
    expect(button).not.toHaveClass('bg-primary');
  });

  it('passes the disabled prop through to the DOM element', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
  });
});
