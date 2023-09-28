import React, { useEffect, useState } from 'react'
import { getHeaders, graphEndpoints } from '../authConfig';

const EmailList: React.FC = () => {
    const [emails, setEmails] = useState([]);
    

    useEffect(() => {
        getEmails().then((res) => setEmails(res.value));
    }, []);

  return (
    <div className='mb-8'>{emails.map((e: any) => 
        <div key={e.subject} className="mb-6">
            <p className="text-blue-800 mb-1">Subject: {e.subject}</p>
            <div dangerouslySetInnerHTML={{ __html: e.body.content}}/>
        </div>)}
    </div>
  )
}

export default EmailList;

const getEmails = async () => {
    const headers = await getHeaders();
    const options = {
        method: "GET",
        headers,
    };
    return fetch(graphEndpoints.emailMessages, options).then((res) => res.json()).catch(() => {});
}