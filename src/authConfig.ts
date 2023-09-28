import { Configuration, PopupRequest } from "@azure/msal-browser";
import { msalInstance } from ".";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.REACT_APP_MS_CLIENT_ID ?? '',
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    system: {
        allowNativeBroker: false // Disables WAM Broker
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ['user.read', 'openid', 'profile', 'people.read', 'Chat.Create', 'Chat.Read', 'Mail.Read', 'Calendars.ReadWrite'],
    prompt: "select_account",
    loginHint: "user@example.com",
};

const GRAPH_ME_ENDPOINT = "https://graph.microsoft.com/v1.0/me";

export const graphEndpoints = {
    me: GRAPH_ME_ENDPOINT,
    emailMessages: `${GRAPH_ME_ENDPOINT}/messages`,
    postEvents: `${GRAPH_ME_ENDPOINT}/events`,
    getEvents: `${GRAPH_ME_ENDPOINT}/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location`
};

export const getHeaders = async () => {
    const account = msalInstance.getActiveAccount();
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account!
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);
    return headers;
}