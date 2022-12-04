import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

import LoaderComponent from '../LoaderComponent'
import Header from '../Header/index'
import BookItemFullDetails from '../BookItemFullDetails'

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

class BookItemDetails extends Component {
  state = {
    booksItemDetailData: '',
    getBookItemDetailAPIStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({
      getBookItemDetailAPIStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const formatBookDataFunction = eachBook => ({
        aboutAuthor: eachBook.about_author,
        aboutBook: eachBook.about_book,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      })

      const formattedBookData = formatBookDataFunction(data.book_details)
      console.log(formattedBookData)

      this.setState({
        booksItemDetailData: formattedBookData,
        getBookItemDetailAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        getBookItemDetailAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBooksView = () => {
    const {getBookItemDetailAPIStatus} = this.state
    // console.log(videosDataAPIStatus)

    switch (getBookItemDetailAPIStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderBookItemDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderVideosFailureView()

      default:
        return null
    }
  }

  renderBookItemDetailsSuccessView = () => {
    const {booksItemDetailData} = this.state
    const eachBook = booksItemDetailData

    return (
      <>
        <ul className="books-list">
          <BookItemFullDetails
            eachBook={eachBook}
            key={booksItemDetailData.id}
          />
        </ul>
      </>
    )
  }

  renderVideosFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1670170457/BooksHub/Group_7522_wxskj4.svg"
        alt="failure view"
        className="failure-img-prop"
      />
      <p>Something went wrong, Please try again.</p>
      <div>
        <button type="button" className="button" onClick={this.getBookDetails}>
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoader = () => <LoaderComponent />

  renderTopRatedFailureView = () => <h1>Sai</h1>

  render() {
    const {getBookItemDetailAPIStatus} = this.state
    return (
      <>
        <Header />

        {getBookItemDetailAPIStatus === apiStatusConstants.inProgress ? (
          this.renderLoader()
        ) : (
          <div className="book-item-background-container">
            <div className="book-item-details-container">
              <div className="book-item-content-container">
                {this.renderBooksView()}
              </div>

              <div
                style={{
                  textAlign: 'center',
                  justifySelf: 'flex-end',
                }}
              >
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
          </div>
        )}
      </>
    )
  }
}

export default BookItemDetails
