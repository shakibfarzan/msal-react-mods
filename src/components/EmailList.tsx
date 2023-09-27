import React, { useEffect, useState } from 'react'
import { msalInstance } from '..';
import { graphEndpoints, loginRequest } from '../authConfig';

const EmailList: React.FC = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        getEmails().then((res) => setEmails(res.value));
    }, []);

  return (
    <div>{emails.map((e: any) => 
        <div key={e.subject} className="mb-6">
            <p className="text-blue-800 mb-1">Subject: {e.subject}</p>
            <div dangerouslySetInnerHTML={{ __html: e.body.content}}/>
        </div>)}
    </div>
  )
}

export default EmailList;

const getEmails = async () => {
    const account = msalInstance.getActiveAccount();
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account!
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    return fetch(graphEndpoints.emailMessages, options).then((res) => res.json()).catch(() => {});
}