import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

import LoaderComponent from '../LoaderComponent'
import Header from '../Header/index'
import SideBar from '../Sidebar'
import BookItem from '../BookItem'

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

class Bookshelves extends Component {
  state = {
    searchInput: '',
    activeBookshelfValue: 'ALL',
    activeBookshelfLabel: 'All',
    booksData: '',
    getBooksAPIStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  setSearchInputFn = event => {
    this.setState({searchInput: event.target.value})
  }

  changeActiveBookshelfValue = activeBookshelfValue => {
    this.setState({activeBookshelfValue}, this.getBooks)
  }

  changeActiveBookshelfLabel = activeBookshelfLabel => {
    this.setState({activeBookshelfLabel})
  }

  getBooks = async () => {
    this.setState({
      getBooksAPIStatus: apiStatusConstants.inProgress,
    })

    const {activeBookshelfValue, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookshelfValue}&search=${searchInput}`
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
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      })

      const formattedBookData = data.books.map(eachBook =>
        formatBookDataFunction(eachBook),
      )

      this.setState({
        booksData: formattedBookData,
        getBooksAPIStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        getBooksAPIStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBooksView = () => {
    const {getBooksAPIStatus} = this.state
    // console.log(videosDataAPIStatus)

    switch (getBooksAPIStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderBookshelvesSuccessView()
      case apiStatusConstants.failure:
        return this.renderBookshelvesFailureView()

      default:
        return null
    }
  }

  renderBookshelvesSuccessView = () => {
    const {booksData, searchInput} = this.state

    if (booksData.length !== 0) {
      console.log()

      return (
        <>
          <ul className="books-list">
            {booksData.map(eachBook => (
              <BookItem eachBook={eachBook} key={eachBook.id} />
            ))}
          </ul>

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
        </>
      )
    }

    return (
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <img
          src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1670163622/BooksHub/Asset_1_1_ry4hfb.svg"
          alt="no books"
          className="no-videos-img-prop"
        />
        <p>Your search for {searchInput} did not find any matches.</p>
      </div>
    )
  }

  renderBookshelvesFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqra4ctyw/image/upload/v1670170457/BooksHub/Group_7522_wxskj4.svg"
        alt="failure view"
        className="failure-img-prop"
      />
      <p>Something went wrong, Please try again.</p>
      <div>
        <button type="button" className="button" onClick={this.getBooks}>
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <LoaderComponent />
    </div>
  )

  renderTopRatedFailureView = () => <h1>Sai</h1>

  render() {
    const {searchInput, activeBookshelfLabel, getBooksAPIStatus} = this.state

    return (
      <>
        <Header />

        {getBooksAPIStatus === apiStatusConstants.inProgress ? (
          this.renderLoader()
        ) : (
          <div className="bookshelves-background-container">
            <div className="bookshelves-container">
              <SideBar
                activeBookshelfLabel={activeBookshelfLabel}
                changeActiveBookshelfValue={this.changeActiveBookshelfValue}
                changeActiveBookshelfLabel={this.changeActiveBookshelfLabel}
              />

              <div className="books-container">
                <div className="bookshelf-and-search-container">
                  <h3 style={{flexGrow: 1, margin: 0}}>
                    {activeBookshelfLabel} Books
                  </h3>

                  <div className="search-input-container">
                    <input
                      type="search"
                      onChange={this.setSearchInputFn}
                      className="search-input-element"
                      placeholder="Search"
                      value={searchInput}
                    />

                    <button
                      type="button"
                      className="search-icon-container"
                      testid="searchButton"
                      onClick={this.getBooks}
                    >
                      <BsSearch />
                    </button>
                  </div>
                </div>

                {this.renderBooksView()}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Bookshelves
