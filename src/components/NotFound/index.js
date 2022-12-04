import {Link} from 'react-router-dom'

import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <>
        <div className="not-found-content-container">
          <div style={{textAlign: 'center', marginTop: '30px', color: 'black'}}>
            <img
              src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1670169790/BooksHub/Group_7484_qih8zq.svg"
              alt="not found"
              className="no-videos-img-prop"
            />
            <h1>Page Not Found</h1>
            <p>we are sorry, the page you requested could not be found</p>

            <Link to="/">
              <button type="button" className="button">
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default NotFound
