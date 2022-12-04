import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

import LoaderComponent from '../LoaderComponent'
import Header from '../Header/index'

import ReactSlick from '../Carousel/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const contactUsIcons = [
  {
    id: 'google',
    iconImageUrl:
      'https://res.cloudinary.com/dqra4ctyw/image/upload/v1670132861/BooksHub/google_ll9bnh.jpg',
  },
  {
    id: 'twitter',
    iconImageUrl:
      'https://res.cloudinary.com/dqra4ctyw/image/upload/v1670132861/BooksHub/twitter_jpobvm.jpg',
  },
  {
    id: 'instagram',
    iconImageUrl:
      'https://res.cloudinary.com/dqra4ctyw/image/upload/v1670132861/BooksHub/instagram_jyitwd.jpg',
  },
  {
    id: 'youtube',
    iconImageUrl:
      'https://res.cloudinary.com/dqra4ctyw/image/upload/v1670132861/BooksHub/youtube_tjqztn.jpg',
  },
]

class Home extends Component {
  state = {
    topRatedBooks: [],
    topRatedBooksAPIStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({
      topRatedBooksAPIStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/top-rated-books`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const formatBookDataFunction = eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      })

      const formattedBookData = data.books.map(eachBook =>
        formatBookDataFunction(eachBook),
      )

      this.setState({
        topRatedBooks: formattedBookData,
        topRatedBooksAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        topRatedBooksAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <LoaderComponent />
    </div>
  )

  renderTopRatedBooksView = () => {
    const {topRatedBooksAPIStatus} = this.state

    if (topRatedBooksAPIStatus === apiStatusConstants.success) {
      return this.renderTopRatedSuccessView()
    }
    if (topRatedBooksAPIStatus === apiStatusConstants.failure) {
      return this.renderTopRatedFailureView()
    }
    return null
  }

  renderTopRatedSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <div className="top-rated-section-overall-container">
        <ReactSlick topRatedBooks={topRatedBooks} />

        <div style={{textAlign: 'center'}}>
          <ul className="contact-us-container">
            {contactUsIcons.map(eachIcon => (
              <li key={eachIcon.id} style={{display: 'flex'}}>
                <img
                  alt={eachIcon.id}
                  src={eachIcon.iconImageUrl}
                  className="contact-us-icon-img-prop"
                />
              </li>
            ))}
          </ul>
          <p style={{margin: 0, marginBottom: '10px'}}>Contact Us</p>
        </div>
      </div>
    )
  }

  renderTopRatedFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1670170457/BooksHub/Group_7522_wxskj4.svg"
        alt="failure view"
        className="failure-img-prop"
      />
      <p>Something went wrong, Please try again.</p>
      <div>
        <button
          type="button"
          className="button"
          onClick={this.getTopRatedBooks}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  render() {
    const {topRatedBooksAPIStatus} = this.state

    return (
      <>
        <Header />

        {topRatedBooksAPIStatus === apiStatusConstants.inProgress ? (
          this.renderLoader()
        ) : (
          <div className="home-container">
            <div className="home-content">
              <div>
                <h1>Find Your Next Favorite Books?</h1>
                <p>
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>
              </div>

              {this.renderTopRatedBooksView()}
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Home
