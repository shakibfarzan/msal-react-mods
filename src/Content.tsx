import React from 'react';
import Register from './components/Register';
import EmailList from './components/EmailList';
import { useIsAuthenticated } from '@azure/msal-react';
import CalendarEvents from './components/CalendarEvents';

const Content: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();
  return (
    <>
        <Register />
        {isAuthenticated && <EmailList />}
        {isAuthenticated && <CalendarEvents />}
    </>
  )
}

export default Content;