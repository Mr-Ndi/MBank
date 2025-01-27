import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../../Axius/axiosInstance';

function Login() {
    const onSuccess = async (credentialResponse: any) => {
        console.log("LOGIN SUCCESS! Credential Response: ", credentialResponse);
        
        const tokenId = credentialResponse.credential;

        try {
            const response = await axiosInstance.post('google-log', { token: tokenId });
            console.log("Response from backend: ", response.data);
        } catch (error: any) {
            console.log("Error during sending login request to backend: ", error.message);
        }
    };

    const onFailure = () => {
        console.log("LOGIN FAILED!");
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
            />
        </div>
    );
}

export default Login;
