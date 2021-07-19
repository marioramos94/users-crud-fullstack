import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from './../config';
const { pkce, issuer, clientId, redirectUri } = config.oidc;
const widgetConfig = {
    baseUrl: issuer.split('/oauth2')[0],
    clientId,
    redirectUri,
    logo: '/logo.svg',
    i18n: {
      en: {
        'primaryauth.title': 'Sign in to React & Company',
      },
    },
    authParams: {
      pkce,
      issuer,
      display: 'page',
      responseMode: pkce ? 'query' : 'fragment',
      scopes:['openid', 'profile', 'email']
    },
  }
export const OktaSignInWidget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current)
      return false;
    const widget = new OktaSignIn(widgetConfig);
    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);
    return () => widget.remove();
  }, [ onSuccess, onError]);
  return (<div ref={widgetRef} />);
};
