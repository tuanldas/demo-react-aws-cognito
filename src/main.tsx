import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {AuthProvider} from 'react-oidc-context';

const redirectUri = window.location.origin;
const authority = import.meta.env.VITE_COGNITO_AUTHORITY as string;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string;

const cognitoAuthConfig = {
    authority,
    client_id: clientId,
    redirect_uri: redirectUri,
    post_logout_redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email phone',
    onSigninCallback: () => {
        // Remove OIDC query params after successful callback to avoid reprocessing
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App/>
        </AuthProvider>
    </StrictMode>,
);
