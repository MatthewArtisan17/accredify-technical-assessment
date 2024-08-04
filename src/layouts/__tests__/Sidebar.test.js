// src/layouts/__tests__/Sidebar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock the necessary dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Sidebar', () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    store = mockStore({
      user: {
        data: {
          current_organisation: { is_personal: false },
        },
      },
    });

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/' });
  });

  test('renders Sidebar and user profile', () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar userName="John Doe" />
        </Router>
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Documents')).toBeInTheDocument();
    expect(screen.getByAltText('Career Goal')).toBeInTheDocument();
    expect(screen.getByAltText('Security')).toBeInTheDocument();
    expect(screen.getByAltText('Settings')).toBeInTheDocument();
  });

  test('handles menu item click and navigation', () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar userName="John Doe" />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByAltText('Documents'));
    expect(mockNavigate).toHaveBeenCalledWith('/documents');

    fireEvent.click(screen.getByAltText('Career Goal'));
    expect(mockNavigate).toHaveBeenCalledWith('/career-goal');

    fireEvent.click(screen.getByAltText('Security'));
    expect(mockNavigate).toHaveBeenCalledWith('/security');

    fireEvent.click(screen.getByAltText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });

  test('updates selected key based on location', () => {
    useLocation.mockReturnValue({ pathname: '/documents' });

    render(
      <Provider store={store}>
        <Router>
          <Sidebar userName="John Doe" />
        </Router>
      </Provider>
    );

    expect(screen.getByAltText('Documents').parentElement).toHaveClass('ant-menu-item-selected');
  });
});