import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import React from 'react'
import { loginRequest } from '../authConfig';
import { InteractionStatus } from '@azure/msal-browser';

const Register: React.FC = () => {
    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
  
    const handleLogin = async () => {
      try {
        await instance.loginPopup(loginRequest);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    const handleLogout = async () => {
      try {
        await instance.logoutPopup({
          mainWindowRedirectUri: "/"
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
    console.log(accounts);
    if (isAuthenticated) {
      return <button className='p-1 text-white bg-red-700 rounded-md' onClick={handleLogout}>Logout from Microsoft</button>;
    } else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
      return (
        <button className='p-1 text-white bg-green-700 rounded-md' onClick={handleLogin}>Login with Microsoft</button>
      )
    } else {
        return null;
    }
}

export default Register;