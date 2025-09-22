import './App.css';
import {useAuth} from 'react-oidc-context';


function App() {
    const auth = useAuth();

    const signOutRedirect = async () => {
        try {
            await auth.signoutRedirect();
        } catch (e) {
            await auth.removeUser();
        }
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={() => signOutRedirect()}>Sign out</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

export default App;
