import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Home = props => {
  const deteteCookie = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="bgContainer">
      <div className="header">
        <div className="imageContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
        </div>
        <div>
          <button type="button" className="button" onClick={deteteCookie}>
            Logout
          </button>
        </div>
      </div>
      <div className="container">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
