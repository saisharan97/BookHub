import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Header extends Component {
  onclickLogoutButton = () => {
    const {history} = this.props

    // const jwtToken = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {match} = this.props

    let homeHeaderColor = 'blue'
    let bookshelvesHeaderColor = ''
    if (match.path === '/') {
      homeHeaderColor = 'blue'
      bookshelvesHeaderColor = ''
    } else {
      homeHeaderColor = ''
      bookshelvesHeaderColor = 'blue'
    }

    return (
      <ul className="nav-container">
        <Link to="/">
          <li>
            <img
              src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1669032058/BooksHub/Group_7731Logo_jr6mi9.png"
              className="header-logo-img-prop"
              alt="website logo"
            />
          </li>
        </Link>

        <li style={{display: 'flex'}}>
          <Link to="/">
            <p style={{marginRight: '20px', color: `${homeHeaderColor}`}}>
              Home
            </p>
          </Link>

          <Link to="/shelf">
            <p style={{color: `${bookshelvesHeaderColor}`}}>Bookshelves</p>
          </Link>

          <button
            type="button"
            className="button"
            onClick={this.onclickLogoutButton}
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
