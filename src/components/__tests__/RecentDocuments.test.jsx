import '../../../matchMedia';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RecentDocuments from '../RecentDocuments';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('RecentDocuments', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      documents: {
        data: [],
        loading: false
      }
    });
  });

  test('renders RecentDocuments and its elements', () => {
    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Recent Documents/i)).toBeInTheDocument();
    expect(screen.queryByText(/View All Documents/i)).toBeNull(); // Not displayed if on /documents route
  });

  test('shows loading spinner when loading', () => {
    store = mockStore({
      documents: {
        data: [],
        loading: true
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
  });

  test('displays "View All Documents" link when not on /documents route', () => {
    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/View All Documents/i)).toBeInTheDocument();
  });

  test('navigates to /documents when "View All Documents" is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/View All Documents/i));
    expect(mockNavigate).toHaveBeenCalledWith('/documents');
  });

  test('renders documents in the table', () => {
    store = mockStore({
      documents: {
        data: [
          { document_name: 'Doc 1', received_on: '2024-08-01' },
          { document_name: 'Doc 2', received_on: '2024-08-02' }
        ],
        loading: false
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <RecentDocuments />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Doc 1')).toBeInTheDocument();
    expect(screen.getByText('Doc 2')).toBeInTheDocument();
    expect(screen.getByText('01 Aug 2024')).toBeInTheDocument();
    expect(screen.getByText('02 Aug 2024')).toBeInTheDocument();
  });
});