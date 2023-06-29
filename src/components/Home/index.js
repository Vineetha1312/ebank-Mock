import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="visa-section">
        <h1 className="visa-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="visa-image"
        />
      </div>
    </div>
  )
}

export default Home
