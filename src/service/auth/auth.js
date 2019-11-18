// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
// import Axios from 'axios';
const { REACT_APP_AUTHORITY_AADMS, REACT_APP_CLIENTID_AADMS } = process.env;
const config = {
    auth: {
        clientId: REACT_APP_CLIENTID_AADMS,
        authority: REACT_APP_AUTHORITY_AADMS,
        redirectURI: "http://localhost:8080/home"


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
