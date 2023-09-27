import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
export const msalInstance = new PublicClientApplication(msalConfig);
test('renders learn react link', () => {
  render(<App pca={msalInstance}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
