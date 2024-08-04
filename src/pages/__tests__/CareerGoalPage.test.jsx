import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CareerGoalPage from '../CareerGoalPage';
import CareerGoal from '../../components/CareerGoal';

// Mock the CareerGoal component
jest.mock('../../components/CareerGoal.jsx', () => () => <div>Career Goal Component</div>);

describe('CareerGoalPage', () => {
  test('renders CareerGoalPage and its content', () => {
    render(<CareerGoalPage />);

    // Check if the main content text is rendered
    expect(screen.getByText(/This is the career goal page content./i)).toBeInTheDocument();
    
    // Check if the CareerGoal component is rendered
    expect(screen.getByText(/Career Goal Component/i)).toBeInTheDocument();
  });

  test('renders CareerGoal component correctly', () => {
    render(<CareerGoalPage />);
    
    // Ensure the CareerGoal component is rendered
    expect(screen.getByText(/Career Goal Component/i)).toBeInTheDocument();
  });

  // Add a test to ensure that the layout and structure are correct
  test('has correct layout and structure', () => {
    render(<CareerGoalPage />);

    // Check for the outer container
    expect(screen.getByRole('generic', { name: /This is the career goal page content./i }).parentElement).toHaveClass('flex flex-col w-[95%] max-w-[1092px] mx-auto');
    
    // Check that the component's text and child component are rendered in the correct layout
    expect(screen.getByText(/This is the career goal page content./i)).toBeInTheDocument();
    expect(screen.getByText(/Career Goal Component/i)).toBeInTheDocument();
  });
});