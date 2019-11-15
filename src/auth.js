// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import Axios from 'axios';

const config = {
    auth: {
        clientId: "b0306e8c-c76e-4e1e-a8c3-41ae52c5097e",
        authority: "https://login.microsoftonline.com/58f5a80f-a60e-4de7-9114-470285231e08",
        //redirectURI: "http://localhost:8080/home"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
}

const scopesConf = {
    scopes: ['openid'],
}


export const authProvider = new MsalAuthProvider(config, scopesConf, LoginType.Redirect);
