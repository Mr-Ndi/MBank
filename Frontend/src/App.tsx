import './App.css';
import Login from './components/Logings/login';
import Logout from './components/Logings/logout';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "298777195045-nnradv3987p1d80d9so66sp75p3h0n5l.apps.googleusercontent.com";

function App() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className='App'>
                <Login />
                <Logout />
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
