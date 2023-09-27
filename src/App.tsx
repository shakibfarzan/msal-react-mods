// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import Register from "./components/Register";
import './App.css'

type AppProps = {
    pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
    return (
        <MsalProvider instance={pca}>
          <div className="App">
              <Register />
          </div>
        </MsalProvider>
    );
}

export default App;
