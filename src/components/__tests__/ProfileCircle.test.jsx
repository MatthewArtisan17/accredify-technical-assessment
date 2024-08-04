// src/components/__tests__/ProfileCircle.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfileCircle from '../ProfileCircle';
import { getInitials } from '../../utils/utils';

// Mock getInitials function if necessary
jest.mock('../../utils/utils', () => ({
  getInitials: jest.fn(),
}));

describe('ProfileCircle', () => {
  test('renders with default size', () => {
    const name = 'John Doe';
    getInitials.mockReturnValue('JD');

    render(<ProfileCircle name={name} />);

    const profileCircle = screen.getByText('JD');
    expect(profileCircle).toBeInTheDocument();
    expect(profileCircle).toHaveStyle('width: 40px');
    expect(profileCircle).toHaveStyle('height: 40px');
    expect(profileCircle).toHaveStyle('font-size: 20px');
  });

  test('renders with custom size', () => {
    const name = 'Jane Doe';
    getInitials.mockReturnValue('JD');

    render(<ProfileCircle name={name} size="50px" />);

    const profileCircle = screen.getByText('JD');
    expect(profileCircle).toBeInTheDocument();
    expect(profileCircle).toHaveStyle('width: 50px');
    expect(profileCircle).toHaveStyle('height: 50px');
    expect(profileCircle).toHaveStyle('font-size: 25px');
  });

  test('displays correct initials based on name', () => {
    const name = 'Alice Wonderland';
    getInitials.mockReturnValue('AW');

    render(<ProfileCircle name={name} />);

    const profileCircle = screen.getByText('AW');
    expect(profileCircle).toBeInTheDocument();
  });

  test('handles empty name', () => {
    getInitials.mockReturnValue('');

    render(<ProfileCircle name="" />);

    // Use a different query to avoid multiple elements issue
    const profileCircle = screen.getByRole('img', { hidden: true }); // or any other role if applicable
    expect(profileCircle).toBeInTheDocument();
  });
});