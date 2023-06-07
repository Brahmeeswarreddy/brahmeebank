import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    if (event.target.value === '') {
      this.setState({showError: true, errorMsg: 'User In Valid'})
    } else {
      this.setState({userId: event.target.value})
    }
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  FailureView = error => {
    this.setState({showError: true, errorMsg: error})
    console.log(error)
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    console.log(userDetails)
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
      this.FailureView(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bgContainer">
        <div className="card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="image"
            />
          </div>
          <div className="formContainer">
            <form onSubmit={this.onSubmitForm}>
              <h1>Welcome Back!</h1>
              <div className="inputContainer">
                <label htmlFor="user">User ID</label>
                <br />
                <input
                  type="text"
                  id="user"
                  className="input"
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="pin">PIN</label>
                <br />
                <input
                  type="password"
                  id="pin"
                  className="input"
                  onChange={this.onChangePin}
                />
              </div>
              <button className="buttonEL" type="submit">
                Login
              </button>
              {showError && <p className="error">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
