import React from 'react';
import Register from './components/Register';
import EmailList from './components/EmailList';
import { useIsAuthenticated } from '@azure/msal-react';

const Content: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();
  return (
    <>
        <Register />
        {isAuthenticated && <EmailList />}
    </>
  )
}

export default Content;