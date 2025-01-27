import { GoogleLogin } from 'react-google-login';
const clientId = "298777195045-nnradv3987p1d80d9so66sp75p3h0n5l.apps.googleusercontent.com"

function Login() {
    const onSuccess = (res: any) => {
        console.log("LOGIN SUCCESS! current user: ",res.profileObj);
    }

    const onFailure = (res: any) =>{
        console.log("LOGIN FAILED! res: ", res)
    }
    return(
        <div id="signInButton">
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
    )
}

export default Login