import { GoogleLogout } from 'react-google-login';
const clientId = "298777195045-nnradv3987p1d80d9so66sp75p3h0n5l.apps.googleusercontent.com"

function Logout() {
    const onSuccess = () => {
        console.log("LOGIN SUCCESS!");
    }

    return(
        <div id="signOutButton">
        <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        />
    </div>
    )
}

export default Logout