import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    if (userId !== '' && pin === '') {
      this.setState({showError: true, errorMsg: 'Invalid PIN'})
    }

    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-card" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-img"
          />
          <div className="login-section">
            <h1 className="login-heading">Welcome Back!</h1>

            <div className="input-section">
              <label className="label-text" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                className="input-element"
                id="userId"
                placeholder="Enter User Id"
                onChange={this.onChangeUserId}
                value={userId}
              />
            </div>
            <div className="input-section">
              <label className="label-text" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                className="input-element"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                value={pin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showError ? <p className="error-msg">{errorMsg}</p> : ''}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
