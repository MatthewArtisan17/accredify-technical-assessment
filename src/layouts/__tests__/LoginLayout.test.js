import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginLayout from '../LoginLayout';

describe('LoginLayout', () => {
  test('renders the LoginLayout component', () => {
    const { getByText } = render(
      <LoginLayout>
        <div>Login Content</div>
      </LoginLayout>
    );

    expect(getByText('Login Content')).toBeInTheDocument();
  });

  test('applies the correct class names', () => {
    const { container } = render(
      <LoginLayout>
        <div>Login Content</div>
      </LoginLayout>
    );

    expect(container.firstChild).toHaveClass('login-layout');
    expect(container.querySelector('.login-content')).toBeInTheDocument();
  });
});