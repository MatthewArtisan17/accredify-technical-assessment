import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CareerGoal from '../CareerGoal';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('CareerGoal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      careerGoal: {
        data: null,
        loading: false
      }
    });
  });

  test('renders CareerGoal and its elements', () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<CareerGoal />} />
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Career Goal/i)).toBeInTheDocument();
  });

  test('shows loading spinner when loading', () => {
    // Render the CareerGoal component with loading state
    render(<CareerGoal />);

    // Check if the spinner element is in the document
    const spinner = screen.getByRole('img', { name: /loading/i });
    expect(spinner).toBeInTheDocument();

    // Optionally, check if it has the 'ant-spin' class or other relevant classes
    expect(spinner.parentElement).toHaveClass('ant-spin');
  });

  test('displays career goal progress and name when data is available', () => {
    store = mockStore({
      careerGoal: {
        data: { name: 'Software Engineer', progress: 75 },
        loading: false
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<CareerGoal />} />
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Your Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/I want to become a:/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  test('displays "View Insights" link when not on /career-goal route', () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<CareerGoal />} />
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/View Insights/i)).toBeInTheDocument();
  });

  test('does not display "View Insights" link when on /career-goal route', () => {
    // Set up the store and router
    store = mockStore({
      careerGoal: {
        data: { name: 'Software Engineer', progress: 75 },
        loading: false
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/career-goal" element={<CareerGoal />} />
          </Routes>
        </Router>
      </Provider>
    );

    // Set the route to /career-goal
    window.history.pushState({}, 'Career Goal', '/career-goal');

    // Re-render to reflect route change
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/career-goal" element={<CareerGoal />} />
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/View Insights/i)).toBeNull();
  });
});