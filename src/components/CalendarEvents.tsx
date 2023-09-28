import React, { useEffect, useState } from 'react'
import { getHeaders, graphEndpoints } from '../authConfig';

const CalendarEvents: React.FC = () => {
    const [body, setBody] = useState<Record<string, any>>();
    const [shouldLoad, setShouldLoad] = useState(true);
    const [events, setEvents] = useState([]);

    const handlePost = async (e: any) => {
        e.preventDefault();
        postCalendarEvent(JSON.stringify(body))
            .then(() => {
                setShouldLoad(true);
            })
            .catch(() => {})
    }

    useEffect(() => {
        if (shouldLoad) {
            getCalendarEvents()
                .then((res) => {
                    setEvents(res.value);
                    setShouldLoad(false);
                })
                .catch(() => {})
        }
    }, [shouldLoad]);

  return (
    <div className='flex justify-between px-60 w-full mb-10'>
        <form className="flex gap-4 flex-col w-1/2">
            <div className='flex gap-2 justify-center items-center'>
                <label htmlFor="subject">Subject:</label>
                <input className='border border-gray-300 rounded-md p-1' id="subject" type="text" placeholder='Subject' onChange={(e) => {
                    setBody((current) => {
                        const copy = { ...current };
                        copy["subject"] = e.target.value;
                        return copy;
                        })
                    }} 
                />
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <label htmlFor="start-date">Start date:</label>
                <input className='border border-gray-300 rounded-md p-1' id="start-date" type="datetime-local" placeholder='Start date' onChange={(e) => {
                    setBody((current) => {
                        const copy = { ...current };
                        copy["start"] = {
                            "dateTime": e.target.value,
                            "timeZone": "UTC"
                        }
                        return copy;
                        })
                    }} 
                />
            </div>
            <div className='flex gap-2 justify-center'>
                <label htmlFor="end-date">End date:</label>
                <input className='border border-gray-300 rounded-md p-1' id='end-date' type='datetime-local' placeholder='End date' onChange={(e) => {
                    setBody((current) => {
                        const copy = { ...current };
                        copy["end"] = {
                            "dateTime": e.target.value,
                            "timeZone": "UTC"
                        }
                        return copy;
                        })
                    }} 
                />
            </div>
            <button type='submit' onClick={handlePost} className="p-2 w-fit m-auto text-white rounded-md bg-blue-800">
                Post event
            </button>
        </form>
        <div className='flex flex-col justify-center items-center gap-4'>
            {events.map((e: any) => <p className='text-purple-950'>{e.subject}</p>)}
        </div>
    </div>
  )
}

export default CalendarEvents;

const getCalendarEvents = async () => {
    const headers = await getHeaders();
    const options: RequestInit = {
        method: "GET",
        headers,
    };
    return fetch(graphEndpoints.getEvents, options).then((res) => res.json()).catch(() => {});
}

const postCalendarEvent = async (body: BodyInit) => {
    const headers = await getHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('cache', 'no-cache');
    const options: RequestInit = {
        method: "POST",
        headers,
        body,
    };
    return fetch(graphEndpoints.postEvents, options).then((res) => res.json()).catch(() => {});
}