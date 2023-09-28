// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import './App.css'
import Content from "./Content";

type AppProps = {
    pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
    return (
        <MsalProvider instance={pca}>
          <div className="App">
            <Content />
          </div>
        </MsalProvider>
    );
}

export default App;
