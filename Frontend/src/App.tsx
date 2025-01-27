import './App.css'
import Login from './components/Logings/login'
import Logout from './components/Logings/logout'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
const clientId = "298777195045-nnradv3987p1d80d9so66sp75p3h0n5l.apps.googleusercontent.com"
function App() {

  useEffect(() =>{
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client: auth2', start);
  })
  return (
    <div className='App'>
        <Login />
        <Logout />
    </div>
  )
}

export default App
