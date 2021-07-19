require('dotenv').config()
export default {
  oidc: {
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
    pkce: true
  },
  api:{
    uri:process.env.REACT_APP_API_URI,
  }
}
