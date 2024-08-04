import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocumentsPage from '../DocumentsPage';
import RecentDocuments from '../../components/RecentDocuments';

// Mock the RecentDocuments component
jest.mock('../../components/RecentDocuments', () => () => <div>Recent Documents Component</div>);

describe('DocumentsPage', () => {
  test('renders DocumentsPage and its content', () => {
    render(<DocumentsPage />);

    // Check if the main content text is rendered
    expect(screen.getByText(/This where you can view recent documents./i)).toBeInTheDocument();
    
    // Check if the RecentDocuments component is rendered
    expect(screen.getByText(/Recent Documents Component/i)).toBeInTheDocument();
  });

  test('renders RecentDocuments component correctly', () => {
    render(<DocumentsPage />);
    
    // Ensure the RecentDocuments component is rendered
    expect(screen.getByText(/Recent Documents Component/i)).toBeInTheDocument();
  });

  // Add a test to ensure that the layout and structure are correct
  test('has correct layout and structure', () => {
    render(<DocumentsPage />);

    // Check for the outer container and its class
    const container = screen.getByText(/This where you can view recent documents./i).parentElement;
    expect(container).toHaveClass('flex flex-col w-[95%] max-w-[1092px] mx-auto');

    // Check for the text content
    expect(screen.getByText(/This where you can view recent documents./i)).toBeInTheDocument();

    // Check that the RecentDocuments component is rendered
    expect(screen.getByText(/Recent Documents Component/i)).toBeInTheDocument();
  });
});