import { Configuration, PopupRequest } from "@azure/msal-browser";

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
    scopes: ['calendars.read', 'user.read', 'openid', 'profile', 'people.read', 'Chat.Create', 'Chat.Read', 'Mail.Read', 'Calendars.ReadWrite'],
    prompt: "select_account",
    loginHint: "user@example.com",
};